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
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore: Se espera que `req.user` haya sido agregado por `authenticate`
        const userRole = req.user?.role;

        // Verifica si el rol del usuario está en la lista de roles permitidos
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
        }

        next(); // Usuario autorizado, continúa con la ejecución
    };
};
