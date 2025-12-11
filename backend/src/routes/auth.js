const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config');


router.post('/login', async (req, res) => {
const { email, password } = req.body;
const db = req.app.get('db');


try {
const result = await db.query(
'SELECT * FROM users WHERE email = $1 AND password = $2',
[email, password]
);


if (result.rows.length === 0) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const user = result.rows[0];


const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });


res.json({ token });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;