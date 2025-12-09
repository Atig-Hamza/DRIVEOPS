import express from 'express';
import dataBase from './src/config/db.js';
import router from './src/routes/index.js';

const app = express();
const PORT = 4000;

dataBase();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log(`server is runned on http://localhost:${PORT}`)
})
