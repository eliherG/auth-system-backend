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
        name: { 
            type: String, // Tipo de dato String
            required: [true, 'El nombre es requerido'], // Mensaje de error personalizado
            trim: true, // Elimina espacios en blanco al inicio y al final
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'], // Longitud mínima
            maxlength: [50, 'El nombre no puede exceder los 50 caracteres'] // Longitud máxima
        },  // Nombre requerido
        email: { 
            type: String, // Tipo de dato String
            required: [true, 'El email es requerido'], // Mensaje de error personalizado
            unique: true, // Asegura que el email sea único en la base de datos
            lowercase: true, // Convierte el email a minúsculas antes de guardarlo
            trim: true, // Elimina espacios en blanco al inicio y al final
            match: [/.+\@.+\..+/, 'Por favor ingresa un email válido'] // Valida el formato del email
        },  // Email requerido y único
        password: { 
            type: String, // Tipo de dato String
            required: [true, 'La contraseña es requerida'], // Mensaje de error personalizado
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'], // Longitud mínima
            maxlength: [100, 'La contraseña no puede exceder los 100 caracteres'], // Longitud máxima
        },  // Contraseña requerida
        role: { 
            type: String, // Tipo de dato String
            enum: ['user', 'admin'], // Enum para definir los roles permitidos
            default: 'user' // Rol por defecto
        },  // Rol del usuario (user o admin)
    }, 
    {
        timestamps: true, // Agrega automáticamente campos createdAt y updatedAt
        versionKey: false // Desactiva el campo __v que Mongoose agrega por defecto
    } 
);

/*
 * Método para convertir el documento a JSON
 * Este método se llama automáticamente cuando se convierte el documento a JSON
 * (por ejemplo, al enviarlo como respuesta en una API).
*/
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject(); // Convierte el documento a un objeto JavaScript
    delete userObject.password; // Elimina la contraseña del objeto que se devuelve
    return userObject; // Devuelve el objeto sin la contraseña
}

// Exporta el modelo de Usuario para usarlo en otras partes del proyecto
export default mongoose.model<IUser>('User', UserSchema);