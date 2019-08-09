DROP DATABASE IF EXISTS bmazon;
CREATE DATABASE bmazon;

USE bmazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT(100),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "clothes", 10.99, 100),
("Keyboard", "electronics", 25.00, 70), 
("GTX_1060", "electronics", 129.50, 50), 
("Jeans", "clothes", 49.99, 500),
("Avengers Blue-Ray", "entertainment", 15.99, 130),
("Best Christmas Song 100", "entertainment", 9.99, 1000),
("Banana", "fruit", 1.25, 160),
("Ice Cream", "dairy", 8.99, 110),
("Antivirus", "software", 59.14, 3000),
("Doll", "toy", 13.25, 300); 