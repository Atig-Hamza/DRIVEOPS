import mongoose from 'mongoose'

const dataBase = async () => {
    console.log('mongoose file readed')

    mongoose.connect('mongodb://127.0.0.1:27017/DRIVEOPS')
        .then(() => console.log('Conncection with DB success'))
        .catch((error) => console.error('error catched: ', error))

}

export default dataBase;