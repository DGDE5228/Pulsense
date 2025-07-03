const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('TU_URI_DE_MONGODB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findOne({ username, password });

  if (user) {
    res.json({ success: true, message: 'Login exitoso' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

app.listen(3000, () => {
  console.log('API escuchando en http://localhost:3000');
});
