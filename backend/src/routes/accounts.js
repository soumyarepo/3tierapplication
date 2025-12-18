const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config'); // Make sure you have jwtSecret here

const router = express.Router();

// Auth middleware
function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

// GET /accounts - Get accounts for logged-in user
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

// POST /accounts/transfer - Transfer money between accounts
router.post('/transfer', auth, async (req, res) => {
    const { from_account, to_account, amount } = req.body;
    const db = req.app.get('db');

    try {
        await db.query('BEGIN');

        // Debit from sender
        const debitResult = await db.query(
            'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND user_id = $3 RETURNING balance',
            [amount, from_account, req.userId]
        );

        if (debitResult.rowCount === 0) {
            await db.query('ROLLBACK');
            return res.status(400).json({ message: 'Invalid from_account or insufficient balance' });
        }

        // Credit to receiver
        await db.query(
            'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
            [amount, to_account]
        );

        // Insert transaction record
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