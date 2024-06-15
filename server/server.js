const { connectDB } = require('./db/Config.js');
const express = require('express');
const dotenv = require('dotenv');
const UserRouter = require('./src/routes/User.js');
const AuthRouter = require('./src/routes/Auth.js');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1); 
    });

app.use('/api/users',UserRouter)
app.use('/api/auth', AuthRouter)