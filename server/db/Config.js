const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const mongoURI = process.env.MONGO_URI ?? "";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports= {connectDB};