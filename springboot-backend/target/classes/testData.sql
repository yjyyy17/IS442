-- ------------CREATE SCHEMA STATEMENTS----------------
CREATE DATABASE IF NOT EXISTS `is442` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `is442`;

-- ------------CREATE STATEMENTS----------------
CREATE TABLE `user` (
  `user_type` varchar(31) NOT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `workflow` (
  `workflow_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`workflow_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `form_template` (
  `form_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `effective_date` date DEFAULT NULL,
  `form_number` varchar(255) NOT NULL,
  `revision_number` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `assignee` bigint DEFAULT NULL,
  PRIMARY KEY (`form_id`),
  KEY `FK8rs41pnpjyiqsrq3u21qa3cqs` (`assignee`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_group` (
  `user_group_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_group_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `question` (
  `questionid` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `options` varchar(255) DEFAULT NULL,
  `order` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `form_id` int DEFAULT NULL,
  PRIMARY KEY (`questionid`),
  UNIQUE KEY `UK_qghbi06logqctca911kcn3p4v` (`form_id`,`questionid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `action` (
  `action_id` bigint NOT NULL AUTO_INCREMENT,
  `assignee_role` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `form_id` int DEFAULT NULL,
  `workflow_id` bigint DEFAULT NULL,
  PRIMARY KEY (`action_id`),
  KEY `FK165tsrmfj6amra06ea9oh832e` (`form_id`),
  KEY `FKr6wah32gar5lcq8cm9dlak57y` (`workflow_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_group_users` (
  `user_group_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`user_group_id`,`user_id`),
  KEY `FK9fcn7gkksqp6ioi1s0bqv9v91` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_group_workflows` (
  `user_group_id` bigint NOT NULL,
  `workflow_id` bigint NOT NULL,
  PRIMARY KEY (`user_group_id`,`workflow_id`),
  KEY `FKhefkxt67it38xscmqq3xng1hq` (`workflow_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `response` (
  `responseid` int NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `questionid` int DEFAULT NULL,
  `formid` int DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  PRIMARY KEY (`responseid`),
  KEY `FK6l194rlbfr9b6dlf0bb21h79y` (`formid`,`questionid`),
  KEY `FKcjyf705i2d5vr5sqylegbdhpb` (`userid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `form_status` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `evaluation_status` varchar(255) DEFAULT NULL,
  `rejection_comments` varchar(255) DEFAULT NULL,
  `rejection_personnel` bigint NOT NULL,
  `form_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `workflow_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKasmffyrslsv6h3sbj724py7v6` (`form_id`),
  KEY `FKs3koonxhpyysteoabm8ls3i16` (`user_id`),
  KEY `FKk13gjkkbwtfk40tyub1eba9te` (`workflow_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `completed_form` (
  `user_group_id` int NOT NULL AUTO_INCREMENT,
  `pdf_id` int NOT NULL,
  `pdf_form` tinyblob,
  PRIMARY KEY (`user_group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------INSERT STATEMENTS----------------
INSERT INTO `is442`.`user`
(`user_type`,`user_id`,`email`,`name`,`password`,`phone_no`,`address`,`industry`, `status`)
VALUES
('Vendor', '3', 'bob@gmail.com', 'Bob Tan', 'iloveoop!', '82233312', 'Serangoon Avenue 5', 'Chemical', 'active'),
('Vendor', '4', 'robinlie48@gmail.com', 'Robin Liew', 'iloveoop!', '82957134', '6 Sin Ming Heights, #07-43', 'Pharmaceuticals', 'active'),
('Vendor', '1', 'aishasub6@gmail.com', 'Aisha Subhash', 'iloveoop!', '80502974', '163 Buona Vista Field', 'Computer Software', 'active'),
('Vendor', '2', 'annaling88@gmail.com', 'Anna Ling', 'iloveoop!', '97250465', '24 Pasir Ris Court', 'Oil & Gas Production', 'active'),
('Admin', '5', 'bryan@gmail.com', 'Bryan Tan', 'iloveoop!', '82233312', NULL, NULL, 'active'),
('Approver', '6', 'brandon@gmail.com', 'Brandon Tan', 'iloveoop!', '82233312', NULL, NULL, 'active'),
('Approver', '7', 'lenayang@gmail.com', 'Lena Yang', 'iloveoop!', '91828070', NULL, NULL, 'active'),
('Approver', '8', 'tedlo@gmail.com', 'Ted Lo', 'iloveoop!', '98531541', NULL, NULL, 'active');

INSERT INTO `is442`.`workflow`
(`workflow_id`,`description`,`title`, `status`)
VALUES
('1', 'Evaluate new vendors', 'Vendor Assessment', 'Active');


INSERT INTO `is442`.`form_template`
(`form_id`,`description`,`effective_date`,`form_number`,`revision_number`,`title`,`assignee`, `status`)
VALUES
('1', 'Assess new vendor', '2023-03-04', 'qli-123-xyz', '1', 'Vendor Assessment Form', '6', 'Approved');

INSERT INTO `is442`.`user_group`
(`user_group_id`, `status`)
VALUES
(1, 'active');

INSERT INTO `is442`.`question`
(`questionid`,`label`,`options`,`order`,`status`,`type`,`form_id`, `status`)
VALUES
('1', 'Company Name', NULL, '1', 'active', 'TextField', '1', 'active'),
('2', 'Company Registration No', NULL, '2', 'active', 'TextField', '1', 'active'),
('3', 'Office Address', NULL, '3', 'active', 'TextField', '1', 'active'),
('4', 'Telephone', NULL, '4', 'active', 'TextField', '1', 'active'),
('5', 'Type of business License / Registration', 'Sole proprietorship,Limited Company,Partnership Agreement,Others', '5', 'active', 'Radio', '1', 'active'),
('6', 'Nature of Business', 'Manufacturing,Agent/Dealer,Distributor,Others', '6', 'active', 'Dropdown', '1', 'active');

INSERT INTO `is442`.`action`
(`action_id`,`assignee_role`,`title`,`form_id`,`workflow_id`)
VALUES
('1', 'Vendor', 'Fill up form', '1', '1');

INSERT INTO `is442`.`user_group_users`
(`user_group_id`,`user_id`)
VALUES
('1', '3'),
('1', '5'),
('1', '6');

INSERT INTO `is442`.`user_group_workflows`
(`user_group_id`,`workflow_id`)
VALUES
('1', '1');

INSERT INTO `is442`.`response`
(`responseid`,`answer`,`status`,`questionid`,`formid`,`userid`, `status`)
VALUES
('1', 'ChemIStry', 'active', '1', '1', '3', 'active'),
('2', 'T18FC0167C', 'active', '2', '1', '3', 'active'),
('3', 'Serangoon Avenue 5', 'active', '3', '1', '3', 'active'),
('4', '61234567', 'active', '4', '1', '3', 'active'),
('5', 'Limited Company', 'active', '5', '1', '3', 'active'),
('6', 'Manufacturing', 'active', '6', '1', '3', 'active');

INSERT INTO `is442`.`form_status`
(`id`,`evaluation_status`,`rejection_comments`,`rejection_personnel`,`form_id`,`user_id`,`workflow_id`, `due_date`)
VALUES
('1', 'Approved', NULL, '0', '1', '3', '1', '2023-04-22');

-- INSERT INTO `is442`.`completed_form`
-- (`user_group_id`,`pdf_id`,`pdf_form`)
-- VALUES
-- ();




