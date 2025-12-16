-- Insert admin user only if not exists
INSERT INTO users (username, password)
SELECT 'admin', '$2b$10$REPLACE_WITH_BCRYPT_HASH'
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE username = 'admin'
);

-- Insert admin account only if not exists
INSERT INTO accounts (user_id, balance, account_number)
SELECT u.id, 10000.00, 'ACC123456'
FROM users u
WHERE u.username = 'admin'
AND NOT EXISTS (
  SELECT 1 FROM accounts WHERE account_number = 'ACC123456'
);
