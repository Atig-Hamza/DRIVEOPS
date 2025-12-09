import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from './config.js'

dotenv.config()

const dataBase = async () => {
    console.log('mongoose file readed')

    mongoose.connect(config.mongoURI)
        .then(() => console.log('Conncection with DB success'))
        .catch((error) => console.error('error catched: ', error))

}

export default dataBase;