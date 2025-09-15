import express from 'express';
import movieRoute from './routes/moviesRoutes.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());

app.use('/api/movies', movieRoute);

connectDB().then(() =>{
    app.listen(PORT,() => {
    console.log(`Server đang chạy trên  http://localhost:${PORT}`)
})
})