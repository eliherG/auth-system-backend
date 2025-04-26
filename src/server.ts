import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno

const PORT = process.env.PORT || 3000;

/*
 * Inicializa el servidor Express en el puerto definido.
 * Por defecto, el puerto es 3000 si no se define en las variables de entorno.
*/
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
