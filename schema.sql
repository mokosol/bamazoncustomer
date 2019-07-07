DROP DATABASE IF EXISTS bamazon;
 CREATE DATABASE bamazon; 

 USE bamazon;

 CREATE TABLE products(
     items_id INT(50) AUTO_INCREMENT NOT NULL,
     products_name VARCHAR(50) NOT NULL,
     departments_name VARCHAR(50) NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     stock INT(50) NOT NULL, 
      PRIMARY KEY (items_id)

 ) 