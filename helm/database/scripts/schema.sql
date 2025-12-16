-- =====================================================
-- MySQL 8.x schema (NO database creation here)
-- Database is selected by MYSQL_DATABASE
-- =====================================================

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0.00,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_account INT NOT NULL,
    to_account INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transactions_from
        FOREIGN KEY (from_account)
        REFERENCES accounts(id),
    CONSTRAINT fk_transactions_to
        FOREIGN KEY (to_account)
        REFERENCES accounts(id)
) ENGINE=InnoDB;

-- INDEXES
ALTER TABLE accounts
    ADD INDEX idx_accounts_user (user_id);

ALTER TABLE transactions
    ADD INDEX idx_tx_from (from_account),
    ADD INDEX idx_tx_to (to_account);
