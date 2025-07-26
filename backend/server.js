// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth.js';
import paymentRoutes from './payment.js';
import subscriptionRoutes from './subscription.js';
import resumeGenerator from './resumeGenerator.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/resume', resumeGenerator);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));