const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // <-- Importado aquí
const jwt = require('jsonwebtoken');   // <-- Importado aquí
const User = require('./models/User'); // <-- Importado aquí

require('dotenv').config();

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar CORS
app.use(cors());

// Habilitar express.json para leer datos de formularios
app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// --- RUTA DE REGISTRO PEGADA DIRECTAMENTE AQUÍ ---
// --- RUTA DE REGISTRO CORREGIDA ---
// --- RUTA DE REGISTRO CON INSTRUMENTACIÓN ---
app.post('/api/auth/register', async (req, res) => {
  console.log('--- BACKEND (1/7): Petición a /api/auth/register recibida ---');
  console.log('--- BACKEND (2/7): Datos recibidos:', req.body);
  const { name, email, password } = req.body;
  try {
    console.log(`--- BACKEND (3/7): Buscando usuario con email: ${email}`);
    let user = await User.findOne({ email });
    
    if (user) {
      console.log('--- BACKEND (ERROR): Usuario encontrado. Devolviendo error 400.');
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    console.log('--- BACKEND (4/7): Usuario no encontrado. Creando nuevo usuario...');
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    console.log('--- BACKEND (5/7): Guardando usuario en la BD...');
    await user.save();
    console.log('--- BACKEND (6/7): ¡Usuario guardado con éxito!');

    const payload = { user: { id: user.id } };
    const MI_SECRETO_TEMPORAL = 'este_es_un_secreto_de_prueba_muy_seguro_12345';
const token = jwt.sign(payload, MI_SECRETO_TEMPORAL, { expiresIn: '5h' });
    
    console.log('--- BACKEND (7/7): ¡Token creado! Enviando respuesta 200 OK.');
    res.status(200).json({ token });

  } catch (err) {
    console.error('--- BACKEND (ERROR CATASTRÓFICO): El bloque try falló. ---');
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});


// --- RUTA DE LOGIN ---
app.post('/api/auth/login', async (req, res) => {
  console.log('--- BACKEND: Petición a /api/auth/login recibida ---');
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Si todo es correcto, crear y firmar el token
    const payload = { user: { id: user.id } };
    const MI_SECRETO_TEMPORAL = 'este_es_un_secreto_de_prueba_muy_seguro_12345';
    const token = jwt.sign(payload, MI_SECRETO_TEMPORAL, { expiresIn: '5h' });

    res.status(200).json({ token });

  } catch (err) {
    console.error("Error en el login: ", err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.use('/api/entries', require('./routes/entries'));

// Iniciar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});