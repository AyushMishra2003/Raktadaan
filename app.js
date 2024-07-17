import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import donorRouter from './route/donor.route.js';
import postDonorRouter from './route/post.route.js';
import hospitalRouter from './route/hospital.route.js';

config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS configuration
app.use((req, res, next) => {
  // Allow any origin when credentials are not present
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials like cookies
  next();
});

// Routes
app.use('/api/v1/donor', donorRouter);
app.use('/api/v1/post', postDonorRouter);
app.use('/api/v1/hospital', hospitalRouter);

// Default route for testing
app.get('/', (req, res) => {
  res.status(200).json({
    message: "success",
    data: "I am running"
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Catch-all route for undefined endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    success:false,
    status:404,
    message:"Oops! Not Found"
  })
});

// Export the app
export default app;
