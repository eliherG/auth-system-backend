import { Request, Response, RequestHandler } from 'express';
import { registerUser, loginUser } from '../services/authService';

/*
 * Controlador que maneja el registro de un nuevo usuario.
 *
 * @route POST /auth/register
 * @param req - Objeto de solicitud HTTP que contiene name, email, password y role (opcional)
 * @param res - Objeto de respuesta HTTP
 * @returns Envía una respuesta JSON con el token JWT y los datos del usuario si el registro es exitoso.
 *
 * @example
 * // Request body
 * {
 *   "name": "Juan Pérez",
 *   "email": "juan@example.com",
 *   "password": "miContraseña123",
 *   "role": "admin" // (opcional, por defecto es 'user')
 * }
 *
 * // Respuesta exitosa (201)
 * {
 *   "success": true,
 *   "data": {
 *     "token": "eyJhbGciOi...",
 *     "user": {
 *       "_id": "60f7...",
 *       "name": "Juan Pérez",
 *       "email": "juan@example.com",
 *       "role": "admin"
 *     }
 *   }
 * }
*/
export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: 'Faltan datos requeridos' 
        });
    }

    try {
        const { token, user } = await registerUser(name, email, password, role);
        res.status(201).json({
            success: true,
            data: {
                token,
                user
            }
        });
    } catch (error: any) {
        const err = error as Error;
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

/*
 * Controlador que maneja el inicio de sesión del usuario.
 *
 * @route POST /auth/login
 * @param req - Objeto de solicitud HTTP con email y password en el cuerpo
 * @param res - Objeto de respuesta HTTP
 * @returns Envía una respuesta JSON con el token JWT y los datos del usuario si la autenticación es válida.
 *
 * @example
 * // Request body
 * {
 *   "email": "juan@example.com",
 *   "password": "miContraseña123"
 * }
 *
 * // Respuesta exitosa (200)
 * {
 *   "success": true,
 *   "data": {
 *     "token": "eyJhbGciOi...",
 *     "user": {
 *       "_id": "60f7...",
 *       "name": "Juan Pérez",
 *       "email": "juan@example.com",
 *       "role": "user"
 *     }
 *   }
 * }
*/
export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Faltan datos requeridos'
        });
        return;
    }

    try {
        const { token, user } = await loginUser(email, password);
        res.status(200).json({
            success: true,
            data: {
                token, 
                user
            }
        });
    } catch (error: any) {
        const err = error as Error;
        res.status(401).json({
            success: false,
            error: err.message
        });
    }
};