CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS accounts (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
account_type VARCHAR(20),
balance NUMERIC(12,2) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS transactions (
id SERIAL PRIMARY KEY,
from_account INT,
to_account INT,
amount NUMERIC(12,2),
created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO users (email, password)
VALUES ('alice@example.com', 'Password123')
ON CONFLICT (email) DO NOTHING;


INSERT INTO accounts (user_id, account_type, balance)
VALUES
(1, 'checking', 15000),
(1, 'savings', 20000);