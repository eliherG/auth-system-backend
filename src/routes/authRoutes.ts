import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

/*
 * Rutas de autenticación.
 * 
 * Estas rutas están relacionadas con el proceso de autenticación
 * y pueden ser accedidas sin necesidad de token (públicas).
*/

/*
 * @route POST /auth/register
 * @desc Permite registrar un nuevo usuario
 * @access Público
*/
router.post('/register', register);

/*
 * @route POST /auth/login
 * @desc Permite iniciar sesión con email y contraseña
 * @access Público
*/
router.post('/login', login);

export default router;