-- Crear usuario asociado a la base de datos -----

create user pixomatic@localhost identified by 'pixomaticpass1.A';
grant all privileges on pixomaticgnc.* to 'pixomatic'@'localhost';

FLUSH privileges;
---------------------------------------------------------
CREATE DATABASE  IF NOT EXISTS `pixomaticgnc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pixomaticgnc`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pixomaticgnc
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `CIF` varchar(9) NOT NULL,
  `shortdesc` varchar(100) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `email` varchar(20) NOT NULL,
  `CCC` varchar(19) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `logo` varchar(50) NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CIF` (`CIF`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (31,'los gatos 1','p18430245','Peuqña descripcion test','larga descripcion de la empresa','a@test.com',NULL,'2020-09-22',NULL,'http://asdfasdfq',NULL),(32,'los gatos 1','Z18430245','Peuqña descripcion test','larga descripcion de la empresa','a@test.com',NULL,'2020-09-12',NULL,'http://asdfasdfq',NULL),(33,'Empresa Seria 1','T12330245','Peuqña descripcion empresa X','Especialista en gatos asiaticos','a@test.com',NULL,'2010-09-12',NULL,'https://milogo.empresaSeria1',NULL),(38,'Empresa Seria 1','A12330245','Peuqña descripcion empresa X','Especialista en gatos asiaticos','a@test.com','123789494 418142 91','2010-09-12',1,'https://milogo.empresaSeria1',NULL),(42,'Empresa Seria 1','A12330215',NULL,'Especialista en gatos asiaticos','a@test.com','123789494 418142 91','2010-09-12',1,'https://milogo.empresaSeria1',NULL),(43,'Empresa Seria 1','A12130215',NULL,'Especialista en gatos asiaticos','a@test.com','123789494 418142 91','2010-09-12',1,'https://milogo.empresaSeria1',NULL),(44,'Empresa Seria 1','P92130215',NULL,'Especialista en gatos asiaticos','a@test.com',NULL,'2010-09-12',1,'https://milogo.empresaSeria1',NULL),(45,'mpresa Seria 781e','P92130214','new short desc update45','Especialista en gatos asiaticos','a@test.com',NULL,'2010-09-12',1,'https://milogo.empresaSeria1','504fc16'),(46,'EmGapa','E92110214',NULL,'Especialista en gatos egipcios','a@test.com',NULL,'2010-09-12',1,'https://milogo.empresaSeria1','9j3b1g'),(47,'Empresa gatuna 124','E92189214','Peuqña descripcion empresa X','Especialista en gatos grandes','info@gat124.com','2834 737 347372 7','2010-09-10',1,'https://milogo.empres124','ep0glrkpc');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `idfavorites` int NOT NULL AUTO_INCREMENT,
  `owner_id` int DEFAULT NULL,
  `companie_id` int DEFAULT NULL,
  PRIMARY KEY (`idfavorites`),
  UNIQUE KEY `uniqueFav` (`owner_id`,`companie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (7,2,33),(6,2,43),(4,2,45),(8,4,33);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-25  0:38:27
