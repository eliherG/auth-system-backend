import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/*
 * Interface para representar los datos contenidos en el JWT.
*/
interface JwtPayload {
    id: string;      // ID del usuario
    role: string;    // Rol del usuario
}

/*
 * Middleware que verifica si el usuario está autenticado mediante un token JWT.
 * Si el token es válido, añade los datos del usuario (id y rol) al objeto `req`.
 * 
 * @param req - Objeto de solicitud (Request)
 * @param res - Objeto de respuesta (Response)
 * @param next - Función que continúa al siguiente middleware
 * @returns Una respuesta 401 si el token no existe o es inválido
*/
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
        return;
    }
};