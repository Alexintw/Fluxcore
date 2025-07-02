import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import healthcheck from './src/healthcheck';
import userRoutes from './src/routes/users';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.use(healthcheck);

// User routes
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

export default app;
