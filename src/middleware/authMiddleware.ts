import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';


/*
 * Representa los datos que se esperan dentro del JWT.
 * @property id - ID único del usuario
 * @property role - Rol del usuario (por ejemplo: 'admin', 'user')
*/
interface JwtPayload {
    id: string;      // ID del usuario
    role: string;    // Rol del usuario
}

/*
 * Extiende el objeto `Request` de Express para incluir información del usuario autenticado.
 * Esto permite que otros middlewares o controladores accedan a `req.user`.
*/
interface AuthenticatedRequest extends Request {
    user?: JwtPayload; // Datos del usuario extraídos del JWT
}

/*
 * Middleware de autenticación que verifica la validez de un token JWT en la cabecera `Authorization`.
 * 
 * Si el token es válido, extrae los datos del usuario y los agrega al objeto `req`.
 * Si no hay token o este es inválido/expirado, retorna un error 401.
 *
 * @function authenticate
 * @param {AuthenticatedRequest} req - Objeto de solicitud extendido con posible propiedad `user`
 * @param {Response} res - Objeto de respuesta
 * @param {NextFunction} next - Función para continuar al siguiente middleware
 * 
 * @returns {void} No retorna directamente, pero puede cortar la cadena de middlewares con una respuesta 401
 *
 * @example
 * // Header esperado:
 * Authorization: Bearer <token>
*/
export const authenticate: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
        return;
    }
};