import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Importa el módulo morgan para registrar las solicitudes HTTP
import cors from 'cors'; // Importa el módulo cors para habilitar CORS
import authRoutes from './routes/authRoutes'; // Importa las rutas de autenticación
import privateRoutes from './routes/privateRoutes'; // Importa las rutas privadas

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();

app.use(morgan('dev')); // Usa morgan para registrar las solicitudes HTTP en modo 'dev'
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Permite recibir datos en formato URL-encoded

app.use('/auth', authRoutes); // Usa las rutas de autenticación
app.use('/private', privateRoutes); // Usa las rutas privadas

/*
 * Ruta base de prueba
 * Se puede acceder con GET a /
*/
app.get('/', (_req, res) => {
    res.send('API funcionando');
});

/*
 * Conexión a la base de datos MongoDB Atlas.
 * Usa la URI definida en las variables de entorno.
*/
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar MongoDB:', err));

export default app;