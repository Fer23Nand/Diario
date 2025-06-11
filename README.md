# Proyecto: Diario Personal 

---

##  Cómo Instalar y Ejecutar el Proyecto

Sigue estos pasos para poner en marcha la aplicación.

### Prerrequisitos
* Tener [Node.js](https://nodejs.org/) instalado.

### 1. Configuración del Backend

Primero, configura el servidor.

```bash
# Navega a la carpeta del backend
cd backend

# Crea el archivo de variables de entorno
# Copia el contenido de 'env.example' y pégalo en un nuevo archivo llamado '.env'
# Asegúrate de poner la contraseña correcta en la MONGO_URI

# Instala las dependencias
npm install

# Desde la carpeta 'backend', sube un nivel y entra a 'frontend'
cd ../frontend

# Instala las dependencias
npm install


# Asegúrate de estar en la carpeta 'backend'
npm run server


# Asegúrate de estar en la carpeta 'frontend'
npm start

El servidor estará corriendo en http://localhost:4000.


Profe, quitamos el .env que contiene la direccion hacia la base de datos, la pondremos aqui por si la llegara a necesitar:
MONGO_URI=mongodb+srv://JaValenzuela23:Diario2025@clusterpoderoso.68y3y2j.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPoderoso
