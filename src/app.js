import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import userRoutes from './routes/user.routes.js'

const app = express();

app.use(express.json());
app.use('/api',employeesRoutes);
app.use('/api', userRoutes);

export default app;
