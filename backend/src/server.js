import express from 'express';
import movieRoute from './routes/moviesRoutes.js'
import userRoute from './routes/usersRoutes.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import "./cronJobs.js";
import orderRouter from './routes/ordersRoute.js';


dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRouter)
connectDB().then(() =>{
    app.listen(PORT,() => {
    console.log(`Server đang chạy trên  http://localhost:${PORT}`)
})
})