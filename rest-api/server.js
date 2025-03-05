const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', (req, res) => {
  res.send('Bienvenido a la API');
});

app.use('/marco', (req, res) => {
  res.send('Ruta de Marco');
});

app.use('/ping', (req, res) => {
  res.send('pong');
});

app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
