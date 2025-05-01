import { Router, Response } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import { Request as ExpressRequest } from 'express';

const router = Router();

/*
 * Rutas protegidas del sistema.
 * Estas rutas solo pueden ser accedidas por usuarios autenticados.
 * Algunas rutas requieren además un rol específico como 'admin'.
*/

// Tipo extendido para incluir datos del usuario autenticado
interface AuthenticatedRequest extends ExpressRequest {
    user?: {
        id: string;
        role: string;
    };
};

/*
 * Ruta exclusiva para administradores.
 *
 * @route GET /private/admin
 * @access Protegida (requiere JWT y rol 'admin')
 * @middleware authenticate - Verifica que el usuario esté autenticado mediante JWT
 * @middleware authorize('admin') - Verifica que el usuario tenga rol 'admin'
 *
 * @returns {200 OK} Mensaje de acceso concedido con datos del usuario
 *
 * @example
 * // Respuesta:
 * {
 *   "success": true,
 *   "data": {
 *     "userId": "123456",
 *     "role": "admin"
 *   },
 *   "message": "Acceso concedido: rol ADMIN"
 * }
*/
router.get('/admin', authenticate, authorize('admin'), (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;

    res.status(200).json({
        success: true,
        data: {
            userId: user.id,
            role: user.role
        },
        message: 'Acceso concedido: rol ADMIN'
    });
});

/*
 * Ruta protegida accesible para cualquier usuario autenticado.
 *
 * @route GET /private/user
 * @access Protegida (requiere JWT)
 * @middleware authenticate - Verifica que el usuario esté autenticado mediante JWT
 *
 * @returns {200 OK} Mensaje de autenticación exitosa con datos del usuario
 *
 * @example
 * // Respuesta:
 * {
 *   "success": true,
 *   "data": {
 *     "userId": "7891011",
 *     "role": "user"
 *   },
 *   "message": "Autenticado correctamente"
 * }
*/
router.get('/user', authenticate, (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;

    res.status(200).json({
        success: true,
        data: {
            userId: user.id,
            role: user.role
        },
        message: 'Autenticado correctamente'
    });
});

export default router;