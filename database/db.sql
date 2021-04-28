CREATE DATABASE jopy;

USE jopy;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL, --save the salt
    fullname VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

DESCRIBE users;

-- DEALINGS TABLE
CREATE TABLE transactions(
    id INT(11) NOT NULL AUTO_INCREMENT,
    ammount INT(11) NOT NULL, 
    type CHAR(6) NOT NULL, 
    spends_cathegory VARCHAR(40), 
    income_cathegory VARCHAR(40), 
    user_id INT(11) NOT NULL, 
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    CONSTRAINT user_fk
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
);
--job, extra, gift
--food/transport/fun/clothes/taxes/health/home...
--income/spends

DESCRIBE transactions;