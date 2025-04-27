import { Request, Response, NextFunction } from 'express';

/*
 * Middleware para controlar el acceso a rutas según el rol del usuario.
 * 
 * @param roles - Lista de roles autorizados para acceder a la ruta.
 * @returns Middleware que verifica si el rol del usuario está permitido.
 * 
 * Uso:
 * router.get('/ruta-protegida', authenticate, authorize('admin', 'moderador'), handler);
*/
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // @ts-ignore
        const userRole = req.user?.role;

        if (!roles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
            return; // Importante: cortar la ejecución sin retornar un valor
        }

      next(); // Continua si está autorizado
    };
};
