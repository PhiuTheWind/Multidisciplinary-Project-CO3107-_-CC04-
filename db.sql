-- CREATE DATABASE IF NOT EXISTS `hcmut_spss`;

-- USE `hcmut_spss`;

-- CREATE TABLE IF NOT EXISTS `student` (
--     `username` varchar(255) primary key,
--     `password` varchar(255) not null,
--     `stu_id` char(7) unique not null,
--     `stu_name` varchar(255) not null,
--     `card_id` varchar(255) not null,
--     `money` INT
-- );


-- CREATE TABLE IF NOT EXISTS `SPSO` (
--     `username` varchar(255) primary key,
--     `password` varchar(255) not null
-- );

-- CREATE TABLE IF NOT EXISTS `Price_parking` (
--     `time_interval` varchar(255) primary key,
--     `price` INT not null
-- );



-- CREATE TABLE IF NOT EXISTS `History` (
-- 	`parking_date` DATE,
--     `bien_so_xe` VARCHAR(255), 
--     `status` VARCHAR(255),
--     `start_time` DATETIME , 
--     `end_time`	DATETIME ,
--     `parking_time` DATETIME , 
--     `student_used` VARCHAR(255),
--     `MSSV` char(7) ,
--     `Price` INT,
--     PRIMARY KEY (`start_time`, `student_used`)

-- );

-- CREATE TABLE IF NOT EXISTS `Visitor` (
-- 	`parking_date` DATE,
--     `bien_so_xe` VARCHAR(255), 
--     `status` VARCHAR(255),
--     `start_time` DATETIME , 
--     `end_time`	DATETIME ,
--     `parking_time` DATETIME , 
--     `Price` INT,
--     `Card_id` varchar(255) not null,
--     PRIMARY KEY (`Card_id`)
-- );








-- INSERT INTO `student` (`username`, `password`, `stu_id`, `stu_name`, `card_id`, `money`) VALUES
-- ('student1', 'password1', '2252919', 'Nguyễn Hoàng Vũ', 11,50000),
-- ('student2', 'password2', '2252096', 'Bùi Đức Mạnh Cường', 22,100000),
-- ('student3', 'password3', '2252608', 'Hoàng Văn Phi', 33,200000),
-- ('student4', 'password4', '2252263', 'Trần Duy Đức Huy', 44, 50000),
-- ('student5', 'password5', '2252293', 'Huỳnh Mai Quốc Khang', 55,60000);

-- INSERT INTO `SPSO` (`username`, `password`) VALUES
-- ('spso1', 'password1');

-- INSERT INTO `Price_parking` (`time_interval`, `price`) VALUES
-- ('morning', '2000'),
-- ('evening', '3000'),
-- ('weekend', '4000');

-- INSERT INTO `Visitor` (`parking_date`, `bien_so_xe`, `status`, `start_time`, `end_time`, `parking_time`, `Price`, `Card_id`) VALUES
-- ('2025-04-01', '59A-11111', 'IN',  '2025-04-13 07:00:00', NULL, NULL, 10000, 'CARD001'),
-- ('2025-04-02', '59A-11111', 'OUT', '2025-04-02 08:00:00', '2025-04-02 10:30:00', '2025-04-02 02:30:00', 13000, 'CARD002'),
-- ('2025-04-03', '59A-11111', 'OUT', '2025-04-03 09:00:00', '2025-04-03 11:00:00', '2025-04-03 02:00:00', 10000, 'CARD003'),
-- ('2025-04-04', '59A-11111', 'OUT', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 10000, 'CARD004');



-- INSERT INTO `History` VALUES
-- ('2025-04-01', '59A-11111', 'IN', '2025-04-13 07:00:00', NULL,NULL, 'Nguyễn Hoàng Vũ', '2252919', 10000),
-- ('2025-04-02', '59A-11111', 'OUT', '2025-04-02 08:00:00', '2025-04-02 10:30:00', '2025-04-02 02:30:00', 'Nguyễn Hoàng Vũ', '2252919', 13000),
-- ('2025-04-03', '59A-11111', 'OUT', '2025-04-03 09:00:00', '2025-04-03 11:00:00', '2025-04-03 02:00:00', 'Nguyễn Hoàng Vũ', '2252919', 10000),
-- ('2025-04-04', '59A-11111', 'OUT', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Nguyễn Hoàng Vũ', '2252919', 10000),

-- -- Student 2252096
-- ('2025-04-01', '59B-22222', 'IN', '2025-04-12 08:00:00', NULL, NULL, 'Bùi Đức Mạnh Cường', '2252096', 8000),
-- ('2025-04-02', '59B-22222', 'OUT', '2025-04-02 09:00:00', '2025-04-02 11:00:00', '2025-04-02 02:00:00', 'Bùi Đức Mạnh Cường', '2252096', 10000),
-- ('2025-04-03', '59B-22222', 'OUT', '2025-04-03 07:30:00', '2025-04-03 09:00:00', '2025-04-03 01:30:00', 'Bùi Đức Mạnh Cường', '2252096', 8000),
-- ('2025-04-04', '59B-22222', 'OUT', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Bùi Đức Mạnh Cường', '2252096', 10000),

-- -- Student 2252608
-- ('2025-04-01', '59C-33333', 'IN', '2025-04-14 08:15:00', NULL, NULL, 'Hoàng Văn Phi', '2252608', 8000),
-- ('2025-04-02', '59C-33333', 'OUT', '2025-04-02 09:15:00', '2025-04-02 11:15:00', '2025-04-02 02:00:00', 'Hoàng Văn Phi', '2252608', 10000),
-- ('2025-04-03', '59C-33333', 'OUT', '2025-04-03 08:30:00', '2025-04-03 10:00:00', '2025-04-03 01:30:00', 'Hoàng Văn Phi', '2252608', 8000),
-- ('2025-04-04', '59C-33333', 'OUT', '2025-04-04 09:45:00', '2025-04-04 11:45:00', '2025-04-04 02:00:00', 'Hoàng Văn Phi', '2252608', 10000),

-- -- Student 2252263
-- ('2025-04-01', '59D-44444', 'IN', '2025-04-15 07:45:00', NULL, NULL, 'Trần Duy Đức Huy', '2252263', 8000),
-- ('2025-04-02', '59D-44444', 'OUT', '2025-04-02 08:30:00', '2025-04-02 10:30:00', '2025-04-02 02:00:00', 'Trần Duy Đức Huy', '2252263', 10000),
-- ('2025-04-03', '59D-44444', 'OUT', '2025-04-03 09:00:00', '2025-04-03 10:30:00', '2025-04-03 01:30:00', 'Trần Duy Đức Huy', '2252263', 8000),
-- ('2025-04-04', '59D-44444', 'OUT', '2025-04-04 08:00:00', '2025-04-04 10:00:00', '2025-04-04 02:00:00', 'Trần Duy Đức Huy', '2252263', 10000),

-- -- Student 2252293
-- ('2025-04-01', '59E-55555', 'IN', '2025-04-16 07:30:00', NULL, NULL, 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-02', '59E-55555', 'OUT', '2025-04-02 08:00:00', '2025-04-02 10:00:00', '2025-04-02 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-03', '59E-55555', 'OUT', '2025-04-03 09:00:00', '2025-04-03 11:00:00', '2025-04-03 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-04', '59E-55555', 'OUT', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000);