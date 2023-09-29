CREATE TABLE category (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100) NOT NULL
);

INSERT INTO category (name) VALUES ("vêtement"), ("voiture"), ("autre");

CREATE TABLE Ad (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(100) NOT NULL,
description TEXT, 
owner VARCHAR(100) NOT NULL,
price INT,
createdAt DATE,
picture VARCHAR(100),
location VARCHAR(100),
category_id INTEGER,
FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO Ad (title, owner, price, createdAt, location, category_id) VALUES ("vélo", "toto", 10, "2023-01-04", "Bordeaux", 3), ("voiture", "bob", 1000,"2023-09-09", "Paris", 2), ("tshirt", "john", 18,"2023-09-01", "Lyon", 1), ("trotinette", "jean", 6,"2023-08-04", "Paris", 3);


SELECT * FROM Ad;
SELECT * FROM category;

SELECT * FROM Ad WHERE city = "Bordeaux";

DELETE FROM Ad WHERE price > 40;

UPDATE Ad SET price = 0 WHERE createdAt = "2023-09-01";

SELECT city, AVG(price) FROM Ad WHERE city = "Paris";

SELECT city, AVG(price) FROM Ad GROUP BY city;

PRAGMA foreign_keys = ON;
SELECT Ad.*, c.name AS categoryName FROM Ad INNER JOIN category AS c ON c.id = Ad.category_id WHERE categoryName = "vêtement";

PRAGMA foreign_keys = ON;
SELECT Ad.*, c.name AS categoryName FROM Ad INNER JOIN category AS c ON c.id = Ad.category_id WHERE categoryName = "vêtement" OR categoryName = "autre";

PRAGMA foreign_keys = ON;
SELECT c.name AS categoryName, AVG(price) AS averagePrice FROM Ad INNER JOIN category AS c ON c.id = Ad.category_id WHERE categoryName = "autre";

PRAGMA foreign_keys = ON;
SELECT Ad.*, c.name AS categoryName FROM Ad INNER JOIN category AS c ON c.id = Ad.category_id WHERE categoryName LIKE "v%";
