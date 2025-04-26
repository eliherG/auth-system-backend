import mongoose, { Schema, Document } from 'mongoose';

/*
 * Interfaz IUser
 * Representa la estructura que debe tener un documento de usuario en MongoDB.
*/
export interface IUser extends Document {
    name: string;               // Nombre del usuario
    email: string;              // Email del usuario (único)
    password: string;           // Contraseña hasheada
    role: 'user' | 'admin';     // Rol del usuario
}

/*
 * Esquema de Mongoose para usuarios.
 * Define cómo se almacenan los datos de usuarios en la base de datos.
*/
const UserSchema: Schema = new Schema<IUser>({
        name: { type: String, required: true }, // Nombre requerido
        email: { type: String, required: true, unique: true, lowercase: true }, // Email único y en minúsculas
        password: { type: String, required: true }, // Contraseña requerida
        role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Rol con valor por defecto
    }, 
    {timestamps: true } // Agrega automáticamente campos createdAt y updatedAt
);

// Exporta el modelo de Usuario para usarlo en otras partes del proyecto
export default mongoose.model<IUser>('User', UserSchema);
