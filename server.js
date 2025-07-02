require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const expressWinston = require('express-winston');
const promClient = require('prom-client');
const { swaggerUi, specs, serveSpec } = require('./swagger');
const responseHandler = require('./middleware/responseHandler');
const errorHandler    = require('./middleware/errorHandler');
const { authLimiter } = require('./middleware/rateLimiter');
const logger          = require('./config/logger');
const connectDB       = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// --- Security ---
app.use(helmet());
const origins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];

app.use(cors({
  origin: origins,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));
app.use(mongoSanitize());

// --- Swagger/OpenAPI ---
app.get('/openapi.json', serveSpec);                         // raw JSON spec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // UI explorer

// --- Metrics ---
promClient.collectDefaultMetrics();
const httpRequestDurationMs = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method','route','status_code'],
  buckets: [50,100,200,300,400,500,1000]
});
app.use((req, res, next) => {
  const end = httpRequestDurationMs.startTimer();
  res.on('finish', () => end({
    method: req.method,
    route: req.route?.path || req.path,
    status_code: res.statusCode
  }));
  next();
});

// --- Request Logging ---
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  expressFormat: true,
  colorize: false
}));

// --- Body Parsing & Response Wrapper ---
app.use(bodyParser.json());
app.use(responseHandler);

// --- Rate Limiting on Auth ---
app.use('/api/auth', authLimiter);

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// --- Metrics Endpoint ---
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// --- Error Logging & Central Handler ---
app.use(expressWinston.errorLogger({ winstonInstance: logger }));
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// --- Start Server ---
// --- Start Server ---
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      logger.info(`Server running on port ${PORT}, docs at /api-docs`)
    );
  })
  .catch(err => {
    logger.error('DB connection failed', err);
    process.exit(1);
  });

module.exports = app;  // <-- 新增這行，提供給 Jest & Supertest 使用
