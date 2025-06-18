# 🛠️ Backend E-commerce API

Este proyecto backend permite consumir productos desde la API pública de VTEX y exponerlos mediante GraphQL. También incluye autenticación de usuarios y conexión a base de datos MongoDB.

---

## 🚀 Tecnologías Utilizadas

- Node.js
- Express.js
- GraphQL (Apollo Server)
- MongoDB + Mongoose
- JWT para autenticación
- node-fetch para consumo de APIs externas

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/Juandavid08/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea el archivo .env

# Agrega el siguiente contenido en .env:

PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=contraseña

### 4. Ejecución

```bash
npm run dev
```
