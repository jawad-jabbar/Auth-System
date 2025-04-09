const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/routes');
const connectdb = require('./db/connectdb');
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

    
connectdb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Connection Successful ${PORT}`)
    })
});

