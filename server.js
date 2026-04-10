import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());    

app.get('/', (req, res) => {
    res.send('Hello from server');
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );          