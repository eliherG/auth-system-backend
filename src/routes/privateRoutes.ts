import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

/*
 * Rutas protegidas del sistema.
 * Estas rutas solo pueden ser accedidas por usuarios autenticados.
 * Algunas rutas requieren además un rol específico como 'admin'.
*/

/*
 * @route GET /private/admin
 * @desc Ruta exclusiva para administradores.
 * Solo accesible si el usuario está autenticado y tiene el rol 'admin'.
 * 
 * @middleware authenticate - Verifica que el usuario esté autenticado (JWT válido)
 * @middleware authorize('admin') - Verifica que el usuario tenga rol 'admin'
 * 
 * @returns Un mensaje de bienvenida para administradores
*/
router.get('/admin', authenticate, authorize('admin'), (req: Request, res: Response) => {
    // @ts-ignore: req.user se inyecta desde el middleware authenticate
    const user = req.user;

    res.json({
        message: `Hola ${user.id}, tienes acceso como ADMIN`
    });
});

/*
 * @route GET /private/user
 * @desc Ruta protegida para cualquier usuario autenticado.
 * No se requiere un rol específico, solo un JWT válido.
 * 
 * @middleware authenticate - Verifica que el usuario esté autenticado
 * 
 * @returns Un mensaje de confirmación de acceso
*/
router.get('/user', authenticate, (req: Request, res: Response) => {
    // @ts-ignore: req.user se inyecta desde el middleware authenticate
    const user = req.user;

    res.json({
        message: `Hola ${user.id}, estás autenticado`
    });
});

export default router;
