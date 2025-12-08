import express from 'express';
import dataBase from './src/config/db.js';

const app = express();
const PORT = 4000;

dataBase();

app.listen(PORT, ()=>{
    console.log(`server is runned on http://localhost:${PORT}`)
})
