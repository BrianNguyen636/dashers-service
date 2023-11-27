DROP DATABASE IF EXISTS dashers;
CREATE DATABASE dashers;
USE dashers;

DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (CustomerID SERIAL PRIMARY KEY,
                        Name VARCHAR(255),
                        PrimaryAddress VARCHAR(255),
                        SecondaryAddress VARCHAR(255),
                        Email VARCHAR(255),
                        Username VARCHAR(255),
                        Password VARCHAR(255)
                        );

DROP TABLE IF EXISTS Stores;
CREATE TABLE Stores (StoreID SERIAL PRIMARY KEY,
                        Name VARCHAR(255),
                        Address VARCHAR(255),
                        City VARCHAR(255),
                        Rating DECIMAL(18,2)
                        );

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (ItemID SERIAL PRIMARY KEY,
                        StoreID BIGINT UNSIGNED NOT NULL,
                        Category VARCHAR(255),
                        Name VARCHAR(255),
                        Price DECIMAL(18,2),
                        Calories BIGINT,
                        Vegetarian BIT,
                        FOREIGN KEY(StoreID) REFERENCES Stores(StoreID)
                        );
                        
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (OrderID SERIAL PRIMARY KEY,
                        CustomerID VARCHAR(255),
                        DeliveryAddress VARCHAR(255),
                        PaymentStatus VARCHAR(255),
                        OrderStatus VARCHAR(255),
                        FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID)
                        );

DROP TABLE IF EXISTS OrderItems;
CREATE TABLE OrderItems (OrderID BIGINT UNSIGNED NOT NULL,
                        ItemID BIGINT UNSIGNED NOT NULL,
                        StoreID BIGINT UNSIGNED NOT NULL,
                        Quantity INT,
                        FOREIGN KEY(OrderID) REFERENCES Orders(OrderID),
                        FOREIGN KEY(ItemID) REFERENCES Items(ItemID),
                        FOREIGN KEY(StoreID) REFERENCES Stores(StoreID)
                        );
                        