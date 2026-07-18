import express from 'express';
import morgan from 'morgan';
import AuthRoutes from './src/route/authRoute.js';
import roleBaseRoutes from './src/route/role_base.js';
import studentRoute from './src/route/studentRoute.js';
import instructorDashboardRoute from './src/route/instructorDashboardRoute.js';

// Unified LMS Routes Import
import lmsRoute from './src/route/lmsRoute.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", AuthRoutes);
app.use("/api/v2", roleBaseRoutes);
app.use("/api/v3", studentRoute);
app.use("/api/v4", instructorDashboardRoute);

// Mount Unified LMS Routes
app.use("/api", lmsRoute);

export default app;
