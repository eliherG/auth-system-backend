# 🔐 Sistema de Autenticación con Roles - Backend

Este proyecto es un sistema de autenticación basado en roles desarrollado con **Node.js**, **Express.js**, **TypeScript** y **MongoDB Atlas**, diseñado para integrarse con un frontend construido en **Next.js**.

## 🧱 Tecnologías y herramientas

- [Node.js v22.14.0]
- [TypeScript v5.8.3]
- [Express.js]
- [MongoDB Atlas]
- [JWT (JSON Web Tokens)]
- [bcryptjs]

---

## 🚀 Funcionalidades principales

- Registro de usuario
- Inicio de sesión con generación de JWT
- Protección de rutas mediante middleware de autenticación
- Control de acceso por rol (`user`, `admin`)
- Organización del código bajo el patrón **MVC**

---

## 📁 Estructura del proyecto

auth-system-backend/
│
├── src/
│   ├── config/          # Configuraciones generales (db, etc)
│   ├── controllers/     # Lógica de los controladores
│   ├── models/          # Modelos de datos (MongoDB con Mongoose)
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Middlewares (autenticación, errores, etc.)
│   ├── services/        # Lógica de negocio (registro, login, etc.)
│   ├── utils/           # Utilidades generales (como manejo de errores, helpers)
│   ├── types/           # Tipado personalizado
│   ├── app.ts           # Configuración de Express
│   └── server.ts        # Inicializa el servidor
│
├── .env                 # Variables de entorno
├── tsconfig.json        # Configuración de TypeScript
└── package.json
