import express from 'express';
import dataBase from './src/config/db.js';
import router from './src/routes/index.js';
import CORS from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(CORS(
    {origin: 'http://localhost:5173', credentials: true}
));

dataBase();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log(`server is runned on http://localhost:${PORT}`)
})
