const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const config = require('./config');
const authRoutes = require('./routes/auth');
const accountsRoutes = require('./routes/accounts');


const app = express();
app.use(cors());
app.use(express.json());


const db = new Pool(config.db);
app.set('db', db);


app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);


app.get('/', (req, res) => res.send('Banking Backend Running'));


app.listen(config.port, () => console.log(`Backend running on port ${config.port}`));