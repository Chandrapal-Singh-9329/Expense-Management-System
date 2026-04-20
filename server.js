import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'
import userRoute from './routes/userRoute.js';
import transactionRoute from './routes/transactionRoute.js';

dotenv.config();
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());    

//Routes
//userRoute
app.use('/api/v1/users', userRoute)
//transection route
app.use('/api/v1/transactions', transactionRoute)

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );          