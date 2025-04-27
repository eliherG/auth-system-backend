import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

/*
 * Controlador que maneja el registro de un nuevo usuario.
 * 
 * @route POST /auth/register
 * @param req - Objeto de solicitud (Request)
 * @param res - Objeto de respuesta (Response)
 * @returns JSON con token JWT y datos del usuario
 * 
 * Body esperado:
 * {
 *   "name": "Nombre del usuario",
 *   "email": "email@ejemplo.com",
 *   "password": "contraseña123",
 *   "role": "admin" // (opcional - por defecto 'user')
 * }
*/
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const { token, user } = await registerUser(name, email, password, role);
        res.status(201).json({ token, user });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


/*
 * Controlador que maneja el inicio de sesión del usuario.
 * 
 * @route POST /auth/login
 * @param req - Objeto de solicitud (Request)
 * @param res - Objeto de respuesta (Response)
 * @returns JSON con token JWT y datos del usuario
 * 
 * Body esperado:
 * {
 *   "email": "email@ejemplo.com",
 *   "password": "contraseña123"
 * }
*/
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};