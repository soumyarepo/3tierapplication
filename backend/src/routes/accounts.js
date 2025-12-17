const express = require('express');
const token = req.headers['authorization']?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Token missing' });


try {
const decoded = jwt.verify(token, config.jwtSecret);
req.userId = decoded.userId;
next();
} catch (e) {
res.status(401).json({ message: 'Invalid token' });
}


router.get('/', auth, async (req, res) => {
const db = req.app.get('db');


try {
const result = await db.query(
'SELECT * FROM accounts WHERE user_id = $1',
[req.userId]
);
res.json(result.rows);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


router.post('/transfer', auth, async (req, res) => {
const { from_account, to_account, amount } = req.body;
const db = req.app.get('db');


try {
await db.query('BEGIN');


await db.query(
'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND user_id = $3',
[amount, from_account, req.userId]
);


await db.query(
'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
[amount, to_account]
);


await db.query(
'INSERT INTO transactions (from_account, to_account, amount) VALUES ($1, $2, $3)',
[from_account, to_account, amount]
);


await db.query('COMMIT');
res.json({ message: 'Transfer successful' });


} catch (err) {
await db.query('ROLLBACK');
console.error(err);
res.status(500).send('Transfer failed');
}
});


module.exports = router;