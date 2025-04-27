import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/*
 * Función para registrar un nuevo usuario en la base de datos.
 * 
 * @param name - Nombre del usuario
 * @param email - Correo electrónico del usuario (único)
 * @param password - Contraseña en texto plano (se hashea antes de guardar)
 * @returns Un objeto que contiene el token JWT y el usuario creado
 * @throws Error si el usuario ya existe
*/
export const registerUser = async (name: string, email: string, password: string, role: string ) => {
    // Verifica si ya hay un usuario registrado con el mismo email
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('El usuario ya existe');

    // Genera un salt y hashea la contraseña para mayor seguridad
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuevo documento de usuario con la contraseña hasheada
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Genera un token JWT con el ID del usuario y su rol
    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' } // El token expira en 1 día
    );

    return { token, user: newUser };
};

/*
 * Función para autenticar a un usuario existente.
 * 
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña ingresada por el usuario
 * @returns Un objeto que contiene el token JWT y los datos del usuario
 * @throws Error si el usuario no existe o la contraseña no coincide
*/
export const loginUser = async (email: string, password: string) => {
    // Busca al usuario en la base de datos por su email
    const user = await User.findOne({ email });
    if (!user) throw new Error('Credenciales inválidas');

    // Compara la contraseña ingresada con la contraseña almacenada (hasheada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales inválidas');

    // Genera un token JWT si las credenciales son válidas
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );

    return { token, user };
};
