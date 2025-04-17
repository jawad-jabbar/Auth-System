const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();


app.use(cors({
  exposedHeaders: ['Authorization']
}));

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler)
app.use('/uploads', express.static('uploads'));

module.exports = app;


