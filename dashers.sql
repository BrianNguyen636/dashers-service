
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2023 at 03:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashers`
--

DROP DATABASE IF EXISTS dashers;
CREATE DATABASE dashers;
USE dashers;
-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--
DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `CustomerID` BIGINT(20) UNSIGNED NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `PrimaryAddress` varchar(255) DEFAULT NULL,
  `SecondaryAddress` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Customers` (`CustomerID`, `Name`, `PrimaryAddress`, `SecondaryAddress`, `Email`, `Username`, `Password`) VALUES
(0, 'John Doe', '1111 Bogus Street', '2222 Sham Ave', 'email@test.com', 'testuser', 'testpassword');


-- --------------------------------------------------------

--
-- Table structure for table `Items`
--
DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
  `ItemID` bigint(20) UNSIGNED NOT NULL,
  `RestaurantID` bigint(20) UNSIGNED NOT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Price` decimal(18,2) DEFAULT NULL,
  `Calories` bigint(20) DEFAULT NULL,
  `Vegetarian` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- MCDONALDS
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(000, 0, 'Entree', 'Big Mac', 6.99, 700, 0),
(001, 0, 'Entree', 'McNuggets', 5.99, 650, 0),
(002, 0, 'Entree', 'Salad', 7.99, 400, 1),
(003, 0, 'Side', 'Small Fries', 1.99, 200, 1),
(004, 0, 'Side', 'Large Fries', 3.99, 400, 1),
(005, 0, 'Side', 'Hash Brown', 1.99, 300, 1),
(006, 0, 'Drink', 'Small Drink', 1.99, 200, 1),
(007, 0, 'Drink', 'Large Drink', 2.99, 300, 1),
(008, 0, 'Dessert', 'Cookie', 1.99, 300, 1),
(009, 0, 'Dessert', 'Milkshake', 3.99, 700, 1);
-- CHICKFILA
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(010, 1, 'Entree', 'Chicken Sandwich', 6.99, 700, 0),
(011, 1, 'Entree', 'Deluxe Chicken Sandwich', 5.99, 650, 0),
(012, 1, 'Entree', 'Cobb Salad', 7.99, 400, 0),
(013, 1, 'Side', 'Small Fries', 1.99, 200, 1),
(014, 1, 'Side', 'Large Fries', 3.99, 400, 1),
(015, 1, 'Entree', 'Chicken Nuggets', 1.99, 300, 0),
(016, 1, 'Drink', 'Small Drink', 1.99, 200, 1),
(017, 1, 'Drink', 'Large Drink', 2.99, 300, 1),
(018, 1, 'Dessert', 'Cookie', 1.99, 300, 1),
(019, 1, 'Dessert', 'Milkshake', 3.99, 700, 1);
-- Wendys
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(020, 2, 'Entree', 'Baconator', 6.99, 800, 0),
(021, 2, 'Entree', 'Hamburger', 5.99, 650, 0),
(022, 2, 'Entree', 'Taco Salad', 7.99, 400, 0),
(023, 2, 'Side', 'Chicken Nuggets', 4.99, 500, 0),
(024, 2, 'Side', 'Small Fries', 1.99, 200, 1),
(025, 2, 'Side', 'Large Fries', 3.99, 300, 0),
(026, 2, 'Drink', 'Small Drink', 1.99, 200, 1),
(027, 2, 'Drink', 'Large Drink', 2.99, 300, 1),
(028, 2, 'Dessert', 'Cookie', 1.99, 300, 1),
(029, 2, 'Dessert', 'Milkshake', 3.99, 700, 1);
-- Panda Express
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(030, 3, 'Entree', 'Bowl', 7.99, 800, 0),
(031, 3, 'Entree', 'Plate', 8.99, 900, 0),
(032, 3, 'Entree', 'Ala Carte', 2.99, 300, 0),
(033, 3, 'Side', 'Fried Rice', 4.99, 500, 1),
(034, 3, 'Side', 'White Rice', 2.99, 300, 1),
(035, 3, 'Side', 'Chow Mein', 3.99, 400, 1),
(036, 3, 'Drink', 'Small Drink', 1.99, 200, 1),
(037, 3, 'Drink', 'Large Drink', 2.99, 300, 1),
(038, 3, 'Side', 'Egg Roll', 1.99, 300, 0),
(039, 3, 'Side', 'Ragoon', 2.99, 300, 1);
-- Popeyes
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(040, 4, 'Entree', 'Chicken Sandwich', 7.99, 800, 0),
(041, 4, 'Entree', '10pc Chicken', 10.99, 1200, 0),
(042, 4, 'Entree', '6pc Chicken', 7.99, 900, 0),
(043, 4, 'Entree', 'Ghost Pepper Wings', 5.99, 600, 0),
(044, 4, 'Side', 'Red Beans Rice', 3.99, 500, 1),
(045, 4, 'Side', 'Mac n Cheese', 3.99, 600, 1),
(046, 4, 'Side', 'Cajun Fries', 2.99, 400, 1),
(047, 4, 'Drink', 'Small Drink', 1.99, 200, 1),
(048, 4, 'Drink', 'Large Drink', 2.99, 300, 1),
(049, 4, 'Side', 'Biscuit', 0.99, 100, 1);
-- Burger King
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(050, 5, 'Entree', 'Whopper', 6.99, 800, 0),
(051, 5, 'Entree', 'Double BK Stacker', 8.99, 1000, 0),
(052, 5, 'Entree', 'Double Whopper', 7.99, 900, 0),
(053, 5, 'Dessert', 'Cookies', 1.99, 200, 1),
(054, 5, 'Side', 'Chicken Nuggets', 3.99, 500, 0),
(055, 5, 'Side', 'Mac n Cheese', 3.99, 600, 1),
(056, 5, 'Side', 'Fries', 2.99, 400, 1),
(057, 5, 'Drink', 'Small Drink', 1.99, 200, 1),
(058, 5, 'Drink', 'Large Drink', 2.99, 300, 1),
(059, 5, 'Dessert', 'Ice Cream', 1.99, 100, 1);
-- Dick's Drive-in
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(060, 6, 'Entree', 'Hamburger', 2.99, 500, 0),
(061, 6, 'Entree', 'Deluxe Cheeseburger', 5.49, 800, 0),
(062, 6, 'Entree', 'Cheeseburger', 3.49, 600, 0),
(063, 6, 'Entree', 'Special Burger', 3.29, 500, 1),
(064, 6, 'Dessert', 'Milkshake', 3.99, 500, 1),
(065, 6, 'Dessert', 'Root Beer float', 3.99, 600, 1),
(066, 6, 'Side', 'Fries', 2.99, 400, 1),
(067, 6, 'Drink', 'Small Drink', 1.99, 200, 1),
(068, 6, 'Drink', 'Large Drink', 2.99, 300, 1),
(069, 6, 'Dessert', 'Ice Cream', 1.99, 100, 1);
-- IHOP
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(070, 7, 'Entree', 'Pancakes', 4.99, 300, 1),
(071, 7, 'Entree', 'Omelette', 6.99, 800, 0),
(072, 7, 'Entree', 'Chicken Fried-Steak', 7.49, 600, 0),
(073, 7, 'Entree', 'Burger', 5.99, 500, 0),
(074, 7, 'Entree', 'Waffles', 3.99, 500, 1),
(075, 7, 'Dessert', 'Biscuit', 3.99, 600, 1),
(076, 7, 'Side', 'Hash Browns', 2.99, 400, 1),
(077, 7, 'Drink', 'Small Drink', 1.99, 200, 1),
(078, 7, 'Drink', 'Large Drink', 2.99, 300, 1),
(079, 7, 'Dessert', 'Ice Cream', 1.99, 100, 1);
-- Red Robin
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(080, 8, 'Entree', 'Hamburger', 4.99, 600, 0),
(081, 8, 'Entree', 'Deluxe Cheeseburger', 6.49, 800, 0),
(082, 8, 'Entree', 'Cheeseburger', 5.49, 600, 0),
(083, 8, 'Entree', 'Salad', 6.29, 400, 1),
(084, 8, 'Dessert', 'Milkshake', 3.99, 500, 1),
(085, 8, 'Side', 'Onion Rings', 3.99, 500, 1),
(086, 8, 'Side', 'Fries', 2.99, 400, 1),
(087, 8, 'Drink', 'Small Drink', 1.99, 200, 1),
(088, 8, 'Drink', 'Large Drink', 2.99, 300, 1),
(089, 8, 'Dessert', 'Ice Cream', 1.99, 100, 1);
-- Denny's
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(090, 10, 'Entree', 'Pancakes', 4.99, 300, 1),
(091, 10, 'Entree', 'Omelette', 6.99, 800, 0),
(092, 10, 'Entree', 'Burger', 5.99, 500, 0),
(093, 10, 'Entree', 'Waffles', 3.99, 500, 1),
(094, 10, 'Dessert', 'Biscuit', 3.99, 600, 1),
(095, 10, 'Side', 'Hash Browns', 2.99, 400, 1),
(096, 10, 'Drink', 'Small Drink', 1.99, 200, 1),
(097, 10, 'Drink', 'Large Drink', 2.99, 300, 1),
(098, 10, 'Dessert', 'Ice Cream', 1.99, 100, 1),
(099, 10, 'Drink', 'Coffee', 1.99, 100, 1);
-- Taco Bell
INSERT INTO `Items` (`ItemID`, `RestaurantID`, `Category`, `Name`, `Price`, `Calories`, `Vegetarian`) VALUES
(100, 11, 'Entree', 'Taco', 2.99, 300, 1),
(101, 11, 'Entree', 'Taco Supreme', 4.99, 800, 0),
(102, 11, 'Entree', 'Burrito', 5.99, 500, 0),
(103, 11, 'Entree', 'Chalupa', 5.99, 500, 0),
(104, 11, 'Dessert', 'Churro', 2.99, 600, 1),
(105, 11, 'Side', 'Tater Tots', 2.99, 400, 1),
(106, 11, 'Drink', 'Small Drink', 1.99, 200, 1),
(107, 11, 'Drink', 'Large Drink', 2.99, 300, 1),
(108, 11, 'Dessert', 'Ice Cream', 1.99, 100, 1),
(109, 11, 'Side', 'Nachos', 1.99, 100, 1);


-- --------------------------------------------------------

--
-- Table structure for table `OrderItems`
--
DROP TABLE IF EXISTS `OrderItems`;
CREATE TABLE `OrderItems` (
  `OrderID` bigint(20) UNSIGNED NOT NULL,
  `ItemID` bigint(20) UNSIGNED NOT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--
DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `OrderID` bigint(20) UNSIGNED NOT NULL,
  `CustomerID` bigint(20) UNSIGNED NOT NULL,
  `DeliveryAddress` varchar(255) DEFAULT NULL,
  `PaymentStatus` varchar(255) DEFAULT NULL,
  `OrderStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `FavOrders`
--
DROP TABLE IF EXISTS `FavOrders`;
CREATE TABLE `FavOrders` (
  `CustomerID` bigint(20) UNSIGNED NOT NULL,
  `OrderID` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant`
--
DROP TABLE IF EXISTS `Restaurant`;
CREATE TABLE `Restaurant` (
  `Name` varchar(255) NOT NULL,
  `Popular_Item` varchar(255) NOT NULL,
  `Rating` int(10) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `RestaurantID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Restaurant`
--

INSERT INTO `Restaurant` (`Name`, `Popular_Item`, `Rating`, `Image`, `RestaurantID`) VALUES
('Burger King', 'Whopper', 4, '/images/burgerking.png', 5),
('Chickfila', 'Chicken Sandwich', 10, '/images/chickfila.jpeg', 1),
('Denny\'s', 'Omelette', 2, '/images/denny.png', 10),
('Dicks Drive-In', 'Deluxe Cheeseburger', 9, '/images/dicks.png', 6),
('IHOP', 'Pancakes', 5, '/images/ihop.png', 7),
('Jack in the Box', 'Curly Fries', 6, '/images/jackinbox.svg', 12),
('McDonald\'s', 'Big Mac', 6, '/images/mcdonald.png', 0),
('Panda Express', 'Chow Mein', 7, '/images/panda.png', 3),
('Popeyes', 'Chicken Sandwich', 5, '/images/popeyes.png', 4),
('Red Robin', 'Salad', 6, '/images/redrobin.jpeg', 8),
('Taco Bell', 'Taco', 10, '/images/tacobell.png', 11),
('Wendy\'s', 'Four for Four combo', 6, '/images/Wendys.png', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Coupons`
--
DROP TABLE IF EXISTS `Coupons`;
CREATE TABLE `Coupons` (
  `CouponID` bigint(20) UNSIGNED NOT NULL,
  `RestaurantID` bigint(20) UNSIGNED NOT NULL,
  `ItemID` bigint(20) UNSIGNED NOT NULL,
  `Discount` int(3) NOT NULL,
  `Expiration` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `Coupons` (`CouponID`, `RestaurantID`, `ItemID`, `Discount`, `Expiration`) VALUES
(0, 0, 0, 50, '04/02/2024'),
(1, 1, 18, 100, '05/01/2024'),
(2, 11, 100, 100, '02/01/2024');

--
-- Table structure for table `Reviews`
--
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
  `ReviewID` bigint(20) UNSIGNED NOT NULL,
  `RestaurantID` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Rating` int(1) NOT NULL,
  `Body` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Reviews` (`ReviewID`, `RestaurantID`, `Name`, `Rating`, `Body`) VALUES
(0, 0, 'Raymoo Hackery', 2, 'Had the Big Mac and it kinda sucked.'),
(1, 4, 'Local Man', 3, 'They never get my order right but it\'s kinda good.'),
(2, 6, 'Kenji', 5, 'Great burgers for cheap!');



-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `RestaurantID` (`RestaurantID`);

--
-- Indexes for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ItemID` (`ItemID`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `FavOrders`
--
ALTER TABLE `FavOrders`
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`RestaurantID`);

--
-- Indexes for table `Restaurant`
--
ALTER TABLE `Coupons`
  ADD PRIMARY KEY (`CouponID`),
  ADD KEY `RestaurantID` (`RestaurantID`),
  ADD KEY `ItemID` (`ItemID`);

--
-- Indexes for table `Reviews`
--
ALTER TABLE `Reviews`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `RestaurantID` (`RestaurantID`);



  
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `CustomerID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `ItemID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `OrderID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Restaurant`
--
ALTER TABLE `Restaurant`
  MODIFY `RestaurantID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Coupons`
--
ALTER TABLE `Coupons`
  MODIFY `CouponID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Coupons`
--
ALTER TABLE `Reviews`
  MODIFY `ReviewID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;


--
-- Constraints for dumped tables
--

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`RestaurantID`) REFERENCES `Restaurant` (`RestaurantID`);

--
-- Constraints for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ItemID`) REFERENCES `Items` (`ItemID`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`);


--
-- Constraints for table `FavOrders`
--
ALTER TABLE `FavOrders`
  ADD CONSTRAINT `favorders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`),
  ADD CONSTRAINT `favorders_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`);

--
-- Constraints for table `Coupons`
--
ALTER TABLE `Coupons`
  ADD CONSTRAINT `coupons_ibfk_2` FOREIGN KEY (`RestaurantID`) REFERENCES `Restaurant` (`RestaurantID`),
  ADD CONSTRAINT `coupons_ibfk_3` FOREIGN KEY (`ItemID`) REFERENCES `Items` (`ItemID`);


--
-- Constraints for table `Items`
--
ALTER TABLE `Reviews`
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`RestaurantID`) REFERENCES `Restaurant` (`RestaurantID`);


COMMIT;
