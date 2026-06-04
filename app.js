import express from 'express';
import morgan from 'morgan';
import AuthRoutes from './src/route/authRoute.js';
import roleBaseRoutes from './src/route/role_base.js';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", AuthRoutes);     
app.use("/api/v2", roleBaseRoutes);   

export default app;
