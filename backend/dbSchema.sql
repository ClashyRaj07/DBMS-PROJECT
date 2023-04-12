use twiktik;

-- Want to Drop TAblse
-- drop table users;
 show tables;
-- Creating Users Table-- 
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  `impressions` int DEFAULT NULL,
  `viewedProfile` varchar(45) DEFAULT NULL,
  `picturePath` varchar(500) DEFAULT 'https://imgs.search.brave.com/tfPSA7_h4u0xIonW23pcAmplHavUbB2DZeVlrNMgKSA/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC50/UVhnOGpEY0NaVHpS/WVNwUnJtWHR3SGFF/SyZwaWQ9QXBp',
  `public_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`email`)
);


-- Creating Posts Table--
CREATE TABLE `posts` (
  `userId` int NOT NULL,
  `postId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `post_img` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `public_url` varchar(500) DEFAULT NULL,
  `likeCount` int NOT NULL DEFAULT '0',
  `commentsCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`postId`)
);


-- Creating Comments Table-- 

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commentUserId_idx` (`userId`),
  KEY `commentPostId_idx` (`postId`)
) ;


-- Creating Likes Table-- 

CREATE TABLE `likes` (
  `liked_by` int NOT NULL,
  `liked_postId` int NOT NULL,
  `likeId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`likeId`),
  KEY `userId_idx` (`liked_by`),
  KEY `liked_postId_idx` (`liked_postId`)
);


-- Creating Relatongships Table--

CREATE TABLE `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int DEFAULT NULL,
  `followedUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `followerUserId_idx` (`followerUserId`),
  KEY `followedUserId_idx` (`followedUserId`)
) ;