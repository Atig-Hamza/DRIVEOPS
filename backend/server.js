import express from 'express';
import dataBase from './src/config/db.js';
import router from './src/routes/index.js';
import CORS from 'cors';

const app = express();
const PORT = 4000;

app.use(CORS(
    {origin: 'http://localhost:5173', credentials: true}
));

dataBase();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log(`server is runned on http://localhost:${PORT}`)
})
