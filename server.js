require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const promClient = require('prom-client');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const responseHandler = require('./middleware/responseHandler');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Prometheus Metrics Setup
dpromClient.collectDefaultMetrics();
const httpRequestDurationMs = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000]
});

// Metrics middleware
app.use((req, res, next) => {
  const end = httpRequestDurationMs.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

// Structured request logging
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false
}));

// Body parser & standardized responses
app.use(bodyParser.json());
app.use(responseHandler);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Structured error logging
app.use(expressWinston.errorLogger({ winstonInstance: logger }));

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Example usage in controllers remains unchanged, with res.json/data being logged
