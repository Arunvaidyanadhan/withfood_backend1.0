
-- user table
CREATE TABLE withfoodusers (
  UserId int(11) NOT NULL AUTO_INCREMENT,
  UserName varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  UserEmail varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  Password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  UserRole varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,

  PRIMARY KEY (UserId),
  UNIQUE KEY UserEmail (UserEmail)
 ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- recipe table
CREATE TABLE `recipes` (
  `RecipeId` int NOT NULL AUTO_INCREMENT,
  `RecipeName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Steps_Tips` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Likes` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Discuss` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Duration` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RecipeType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Course` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Cousine` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Tips` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ImagePath` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RecipeId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- incredient table

CREATE TABLE `ingredients` (
  `IncredientsId` int NOT NULL AUTO_INCREMENT,
  `IncredientsName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Measurments` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsOptional` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IsSwappable` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RecipeId` int DEFAULT NULL,
  `Quantity` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`IncredientsId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- swappable  table

CREATE TABLE `swappable_ingredients` (
  `Swappable_IncredientsId` int NOT NULL AUTO_INCREMENT,
  `IncredientsId` int DEFAULT NULL,
  `ParentIncredientsName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Measurments` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RecipeId` int DEFAULT NULL,
  `SwappableIngredientName` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Swappable_IncredientsId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




