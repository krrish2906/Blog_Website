// Module Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Local Imports 
import { serverConfig } from './config/serverConfig.js'
import connectDB from './config/dbConfig.js';
import ApiRoutes from './routes/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', ApiRoutes);

app.get('/', (req, res) => {
    res.send('Blog App Backend Server')
})

app.listen(serverConfig.PORT, async () => {
    console.log(`\nServer is running on http://localhost:${serverConfig.PORT}`);
    await connectDB();
})