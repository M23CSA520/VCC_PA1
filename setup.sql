CREATE DATABASE microservice_db;
USE microservice_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
CREATE USER 'user'@'192.168.1.%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON microservice_db.* TO 'user'@'192.168.1.%';
FLUSH PRIVILEGES;
EXIT;
