import express from 'express';
import morgan from 'morgan';
import AuthRoutes from './src/route/authRoute.js';
import roleBaseRoutes from './src/route/role_base.js';
import studentRoute from './src/route/studentRoute.js';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", AuthRoutes);     
app.use("/api/v2", roleBaseRoutes);   
app.use("/api/v3", studentRoute);

export default app;
