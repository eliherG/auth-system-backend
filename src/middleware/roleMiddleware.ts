import { Request, Response, NextFunction, RequestHandler } from 'express';

/*
 * Interface que representa la información contenida en el token JWT,
 * utilizada para identificar al usuario autenticado.
 *
 * @property id - ID único del usuario
 * @property role - Rol del usuario (por ejemplo, 'admin', 'user')
*/
interface JwtPayload {
    id: string;
    role: string;
};


/*
 * Interface que extiende `Request` para incluir la propiedad `user`,
 * la cual es añadida por el middleware `authenticate`.
*/
interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
};

/*
 * Middleware de autorización que restringe el acceso a rutas según los roles especificados.
 * 
 * @param {...string} roles - Lista de roles autorizados para acceder a la ruta.
 * @returns {RequestHandler} Middleware que valida si el usuario tiene un rol permitido.
 * 
 * @example
 * // Solo permite acceso a usuarios con rol 'admin' o 'moderador':
 * router.get('/ruta-protegida', authenticate, authorize('admin', 'moderador'), handler);
 * 
 * @response 403 - Si el usuario no tiene un rol autorizado.
*/
export const authorize = (...roles: string[]): RequestHandler => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
            return; // Importante: cortar la ejecución sin retornar un valor
        }

      next(); // Continua si está autorizado
    };
};
