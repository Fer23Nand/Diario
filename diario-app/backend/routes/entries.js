const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Importamos nuestro guardián
const Entry = require('../models/Entry'); // Importamos el modelo de Entrada

// @route   GET api/entries
// @desc    Obtener todas las entradas del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de Servidor');
  }
});

// @route   POST api/entries
// @desc    Crear una nueva entrada
// @access  Private
router.post('/', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const newEntry = new Entry({
      content,
      user: req.user.id,
    });

    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de Servidor');
  }
});

module.exports = router;