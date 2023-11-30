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

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `CustomerID` varchar(255) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `PrimaryAddress` varchar(255) DEFAULT NULL,
  `SecondaryAddress` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `ItemID` bigint(20) UNSIGNED NOT NULL,
  `StoreID` bigint(20) UNSIGNED NOT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Price` decimal(18,2) DEFAULT NULL,
  `Calories` bigint(20) DEFAULT NULL,
  `Vegetarian` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `OrderItems`
--

CREATE TABLE `OrderItems` (
  `OrderID` bigint(20) UNSIGNED NOT NULL,
  `ItemID` bigint(20) UNSIGNED NOT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `OrderID` bigint(20) UNSIGNED NOT NULL,
  `CustomerID` varchar(255) DEFAULT NULL,
  `DeliveryAddress` varchar(255) DEFAULT NULL,
  `PaymentStatus` varchar(255) DEFAULT NULL,
  `OrderStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant`
--

CREATE TABLE `Restaurant` (
  `Name` varchar(255) NOT NULL,
  `Popular_Item` varchar(255) NOT NULL,
  `Rating` int(10) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Restaurant`
--

INSERT INTO `Restaurant` (`Name`, `Popular_Item`, `Rating`, `Image`, `ID`) VALUES
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
-- Table structure for table `Stores`
--

CREATE TABLE `Stores` (
  `StoreID` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Rating` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `StoreID` (`StoreID`);

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
-- Indexes for table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`Name`);

--
-- Indexes for table `Stores`
--
ALTER TABLE `Stores`
  ADD PRIMARY KEY (`StoreID`);

--
-- AUTO_INCREMENT for dumped tables
--

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
-- AUTO_INCREMENT for table `Stores`
--
ALTER TABLE `Stores`
  MODIFY `StoreID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `Stores` (`StoreID`);

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
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
