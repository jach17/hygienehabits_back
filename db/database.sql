CREATE DATABASE IF NOT EXISTS compannydb;

USE compannydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5)DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee VALUES
    (1, 'Laura', 1500),
    (2, 'Lesslie', 1500),
    (3, 'Luis', 1500),
    (4, 'Arely', 1500);
