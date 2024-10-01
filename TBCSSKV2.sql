ROLLBACK;
UNLOCK TABLES;
SELECT CONCAT('KILL ', id, ';') 
FROM information_schema.processlist 
WHERE db = 'TBCSSK';

DROP DATABASE `TBCSSK`;


CREATE DATABASE  IF NOT EXISTS `TBCSSK` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `TBCSSK`;
-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: ban_do_noi_that
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'health_care'),(3,'medical_equipment'),(2,'sports_fitness');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `shopOrderId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shopOrderId` (`shopOrderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `collection` varchar(50) DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `typeId` int DEFAULT NULL,
  `description` text NOT NULL,
  `material` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `image` text,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `categoryId` (`categoryId`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `Type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Ghế Massage Toàn Thân Royal','Sang trọng','Lớn',1,'Ghế massage toàn thân cao cấp với nhiều chế độ massage và tự động phát hiện cơ thể.','Da tổng hợp',25000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955761/product_image/lz4opaw2eljltay2s3tl.jpg',1),(2,'Máy Chạy Bộ Gia Đình Sunny','Thể thao','Vừa',2,'Máy chạy bộ điện với nhiều mức độ tập luyện và màn hình hiển thị nhịp tim.','Thép, Nhựa',15000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955789/product_image/kbv4b2cz95o6z3x6i2l3.webp',2),(3,'Máy Đo Huyết Áp Omron','Y tế','Nhỏ',3,'Máy đo huyết áp kỹ thuật số chính xác với chức năng lưu trữ và màn hình lớn.','Nhựa',1200000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955805/product_image/eenqe2njlqoezhjnk9rv.png',3),(4,'Ghế Massage Ecomax','Tiện nghi','Lớn',1,'Ghế massage với chức năng sưởi ấm và đấm bóp sâu cho toàn bộ cơ thể.','Da PU',18000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955820/product_image/uc6ys7gmlh0qukelx74t.webp',1),(5,'Xe Đạp Tập Thể Dục Air Bike','Thể thao','Vừa',2,'Xe đạp tập với chế độ kháng lực và đo lượng calo tiêu thụ.','Thép, Nhựa',5000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955838/product_image/ecp7wa8vfztxt5ergmky.jpg',2),(6,'Máy Đo Đường Huyết Accu-Chek','Y tế','Nhỏ',3,'Máy đo đường huyết chính xác với que thử kèm theo và màn hình hiển thị rõ ràng.','Nhựa',900000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955854/product_image/fv4womkxuyaz45ecknsu.jpg',3),(7,'Ghế Massage Shika','Sang trọng','Lớn',1,'Ghế massage tự động với công nghệ 3D và chế độ massage chân không.','Da tổng hợp',22000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955868/product_image/quhxetzuiryhqvdywq0p.jpg',1),(8,'Máy Chạy Bộ Kingsport','Thể thao','Lớn',2,'Máy chạy bộ chuyên nghiệp với chức năng gấp gọn và màn hình cảm ứng.','Thép, Nhựa',17000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955882/product_image/xqdilyr0vhwajcbwowob.jpg',2),(9,'Máy Xông Mũi Họng Beurer','Y tế','Nhỏ',3,'Máy xông mũi họng hiệu quả với bộ phụ kiện đầy đủ và dễ sử dụng.','Nhựa',1200000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955893/product_image/ysb0gfjqazjxf8tbqxsv.webp',3),(10,'Ghế Massage Inada','Sang trọng','Lớn',1,'Ghế massage với chế độ thư giãn chuyên sâu và chức năng nhiệt hồng ngoại.','Da tổng hợp',30000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955914/product_image/k7mz7zyiiskzsv5kizvf.jpg',1),(11,'Xe Đạp Tập Spin Bike','Thể thao','Vừa',2,'Xe đạp tập với hệ thống kháng lực điều chỉnh và bánh đà nặng.','Thép, Nhựa',6000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955939/product_image/fdylqtxsjco9xwxujkea.jpg',2),(12,'Máy Đo Nhiệt Độ Microlife','Y tế','Nhỏ',3,'Máy đo nhiệt độ chính xác với đầu đo hồng ngoại và khả năng đo không tiếp xúc.','Nhựa',800000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955953/product_image/oe4rb7swnldohqwkdjdu.jpg',3),(13,'Ghế Massage Maxcare','Tiện nghi','Lớn',1,'Ghế massage với công nghệ túi khí và chế độ rung mạnh mẽ.','Da PU',20000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955967/product_image/i0uf6sxgpnavt4hydydf.webp',1),(14,'Máy Chạy Bộ Elip','Thể thao','Lớn',2,'Máy chạy bộ đa năng với nhiều bài tập cài đặt sẵn và loa Bluetooth.','Thép, Nhựa',16000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955983/product_image/zolcrdi3zimqzkw2r87i.png',2),(15,'Máy Đo Nồng Độ Oxy Beurer','Y tế','Nhỏ',3,'Máy đo nồng độ oxy trong máu với màn hình hiển thị LED và chức năng đo nhịp tim.','Nhựa',1100000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956067/product_image/h0ilfmdgursqaujmkasc.jpg',3),(16,'Ghế Massage Boss','Sang trọng','Lớn',1,'Ghế massage tự động với hệ thống con lăn thông minh và chức năng phát nhạc.','Da thật',35000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956052/product_image/wdxn3zzhw4rxjd72agvp.png',1),(17,'Xe Đạp Tập Thể Dục Reebok','Thể thao','Vừa',2,'Xe đạp tập với màn hình LCD và khả năng kết nối với ứng dụng điện thoại.','Thép, Nhựa',7000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956036/product_image/uatl7gxoo1lzxqqzelar.webp',2),(18,'Máy Đo Huyết Áp Boso','Y tế','Nhỏ',3,'Máy đo huyết áp tự động với công nghệ đo dao động và bộ nhớ lớn.','Nhựa',1300000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956019/product_image/flkhls6jmooaxriombtm.jpg',3),(19,'Ghế Massage Osaki','Sang trọng','Lớn',1,'Ghế massage với chức năng kéo giãn cơ thể và chế độ massage Shiatsu.','Da tổng hợp',28000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956004/product_image/jxeunl0frik0np3s0xtn.jpg',1),(20,'Máy Chạy Bộ TechFitness','Thể thao','Lớn',2,'Máy chạy bộ với hệ thống giảm chấn và màn hình cảm ứng lớn.','Thép, Nhựa',18000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956161/product_image/estpndbmb9c1dmmjrmnp.jpg',2),(21,'Máy Đo Nhịp Tim Microlife','Y tế','Nhỏ',3,'Máy đo nhịp tim chính xác với cảm biến hiện đại và bộ nhớ lưu trữ.','Nhựa',1000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956145/product_image/vpuvbeujvkqvrwqpibcj.webp',3),(22,'Ghế Massage Fujikashi','Tiện nghi','Lớn',1,'Ghế massage với công nghệ rung và chế độ làm mát tự động.','Da PU',24000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956132/product_image/jzfa92zeixcr8znfuz1s.jpg',1),(23,'Xe Đạp Tập Thể Dục GoodFor','Thể thao','Vừa',2,'Xe đạp tập với khung sườn chắc chắn và chức năng điều chỉnh kháng lực.','Thép, Nhựa',6500000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956114/product_image/jndvbllp6vqgjcu3m3ty.png',2),(24,'Máy Đo Huyết Áp Citizen','Y tế','Nhỏ',3,'Máy đo huyết áp chính xác với cảm biến điện tử và màn hình lớn dễ đọc.','Nhựa',950000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723956081/product_image/qev5esgoo42cegcewgrh.webp',3),(25,'Ghế Massage Daikou','Sang trọng','Lớn',1,'Ghế massage toàn thân với chức năng sưởi ấm và túi khí 3D.','Da tổng hợp',32000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955113/product_image/dfo6c4svsnclvjhaawov.jpg',1),(26,'Máy Chạy Bộ TechGym','Thể thao','Lớn',2,'Máy chạy bộ với nhiều bài tập được cài đặt sẵn và loa tích hợp.','Thép, Nhựa',14000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955097/product_image/zz7uticauw5ghjtroj4a.webp',2),(27,'Máy Đo Đường Huyết On Call','Y tế','Nhỏ',3,'Máy đo đường huyết với que thử tích hợp và màn hình hiển thị rõ ràng.','Nhựa',1000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955080/product_image/boyswrsghmryfzpjjejc.jpg',3),(28,'Ghế Massage Kiwami','Tiện nghi','Lớn',1,'Ghế massage với hệ thống đèn LED và chế độ massage tự động.','Da PU',21000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723955063/product_image/kjh8xg0gpuz8okvhwkxk.jpg',1),(29,'Xe Đạp Tập Thể Dục SportPro','Thể thao','Vừa',2,'Xe đạp tập với khung sườn nhẹ và chức năng đo nhịp tim.','Thép, Nhựa',6000000,'http://res.cloudinary.com/dlmjgnar7/image/upload/v1723954968/product_image/c1evdlv4ljrgir9rw8lb.jpg',2);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Registration_User_Token`
--

DROP TABLE IF EXISTS `Registration_User_Token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Registration_User_Token` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(36) NOT NULL,
  `userId` int NOT NULL,
  `expiryDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `userId` (`userId`),
  CONSTRAINT `registration_user_token_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Registration_User_Token`
--

LOCK TABLES `Registration_User_Token` WRITE;
/*!40000 ALTER TABLE `Registration_User_Token` DISABLE KEYS */;
/*!40000 ALTER TABLE `Registration_User_Token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reset_Password_Token`
--

DROP TABLE IF EXISTS `Reset_Password_Token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reset_Password_Token` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(36) NOT NULL,
  `userId` int NOT NULL,
  `expiryDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `userId` (`userId`),
  CONSTRAINT `reset_password_token_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reset_Password_Token`
--

LOCK TABLES `Reset_Password_Token` WRITE;
/*!40000 ALTER TABLE `Reset_Password_Token` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reset_Password_Token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopOrder`
--

DROP TABLE IF EXISTS `ShopOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopOrder` (
    `id` int NOT NULL AUTO_INCREMENT,
    `orderDate` date NOT NULL,
    `totalPrice` int NOT NULL,
    `addressShipping` varchar(100) NOT NULL,
    `phoneNumberShip` varchar(100) NOT NULL,
    `orderStatus` enum('NOT_PAY','PROCESSING','PAY') DEFAULT 'NOT_PAY',
    `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `shoporder_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopOrder`
--

LOCK TABLES `ShopOrder` WRITE;
/*!40000 ALTER TABLE `ShopOrder` DISABLE KEYS */;
INSERT INTO `ShopOrder` (`id`, `orderDate`, `totalPrice`, `addressShipping`, `phoneNumberShip`, `orderStatus`, `userId`) 
VALUES 
(1, '2024-08-18', 2000000, '123 Main St', '0123456789', 'PROCESSING', 6),
(2, '2024-08-18', 2000000, '456 Elm St', '0987654321', 'PROCESSING', 6);
/*!40000 ALTER TABLE `ShopOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopOrderItem`
--

DROP TABLE IF EXISTS `ShopOrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopOrderItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `productId` int NOT NULL,
  `price` int,
  `shopOrderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `shopOrderId` (`shopOrderId`),
  CONSTRAINT `shoporderitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shoporderitem_ibfk_2` FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopOrderItem`
--

-- LOCK TABLES `ShopOrderItem` WRITE;
-- /*!40000 ALTER TABLE `ShopOrderItem` DISABLE KEYS */;
-- INSERT INTO `ShopOrderItem` VALUES (1,2,27,1, 100000),(2,2,27,2, 1000000);
-- /*!40000 ALTER TABLE `ShopOrderItem` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `ShoppingCart`
--

DROP TABLE IF EXISTS `ShoppingCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShoppingCart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCart`
--

LOCK TABLES `ShoppingCart` WRITE;
/*!40000 ALTER TABLE `ShoppingCart` DISABLE KEYS */;
INSERT INTO `ShoppingCart` VALUES (1,6,'2024-08-17 20:26:49');
/*!40000 ALTER TABLE `ShoppingCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShoppingCartItem`
--

DROP TABLE IF EXISTS `ShoppingCartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShoppingCartItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `productId` int NOT NULL,
  `shoppingCartId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `shoppingCartId` (`shoppingCartId`),
  CONSTRAINT `shoppingcartitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shoppingcartitem_ibfk_2` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShoppingCartItem`
--

LOCK TABLES `ShoppingCartItem` WRITE;
/*!40000 ALTER TABLE `ShoppingCartItem` DISABLE KEYS */;
INSERT INTO `ShoppingCartItem` VALUES (1,2,27,1);
/*!40000 ALTER TABLE `ShoppingCartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Type`
--

DROP TABLE IF EXISTS `Type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TypeName` (`TypeName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Type`
--

LOCK TABLES `Type` WRITE;
/*!40000 ALTER TABLE `Type` DISABLE KEYS */;
INSERT INTO `Type` VALUES (1,'Massage'),(2,'Tập luyện'),(3,'Thiết bị y tế');
/*!40000 ALTER TABLE `Type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(800) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `image` text,
  `firstName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `user_chk_1` CHECK (((length(`username`) >= 5) and (length(`username`) <= 50))),
  CONSTRAINT `user_chk_2` CHECK (((length(`email`) >= 6) and (length(`email`) <= 50)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'ghieu0123','ghieu0123@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','tp.Bac Ninh','123456789',NULL,'Hieu','Nguyen','ADMIN',1),(2,'duchao','duchao@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Tien du, Bac Ninh','987654321',NULL,'Hao','Nguyen','ADMIN',1),(3,'phanphong','phanphong@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Lao Cai','987654321',NULL,'Phong','Phan','USER',1),(4,'sontung','sontung@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Luc Nam, Bac Giang','123456789',NULL,'tung','Nguyen','USER',1),(5,'vuhai','vuhai@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Tien du, Bac Ninh','987654321',NULL,'Hai','Vu','ADMIN',1),(6,'admin','admin@gmail.com','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','admin','1111111111',NULL,'admin','v1','ADMIN',1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-18 12:30:18
