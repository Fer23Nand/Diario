const jwt = require('jsonwebtoken');

// Este es el secreto que pusimos directamente en server.js
const MI_SECRETO_TEMPORAL = 'este_es_un_secreto_de_prueba_muy_seguro_12345';

module.exports = function (req, res, next) {
  // Obtener el token del header
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  // Validar el token
  try {
    const decoded = jwt.verify(token, MI_SECRETO_TEMPORAL);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};