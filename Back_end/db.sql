-- select * from request;
-- DROP DATABASE hcmut_spss;


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








-- INSERT INTO `student` (`username`, `password`, `stu_id`, `stu_name`, `card_id`, `money`) VALUES
-- ('student1', 'password1', '2252919', 'Nguyễn Hoàng Vũ', 11,50000),
-- ('student2', 'password2', '2252096', 'Bùi Đức Mạnh Cường', 22,100000),
-- ('student3', 'password3', '2252608', 'Hoàng Văn Phi', 33,200000),
-- ('student4', 'password4', '2252263', 'Trần Duy Đức Huy', 44, 50000),
-- ('student5', 'password5', '2252293', 'Huỳnh Mai Quốc Khang', 55,60000);

-- INSERT INTO `SPSO` (`username`, `password`) VALUES
-- ('spso1', 'password1');


-- INSERT INTO `History` VALUES
-- ('2025-04-01', '59A-11111', 'IN', '2025-04-01 07:00:00', '2025-04-01 09:00:00', '2025-04-01 02:00:00', 'Nguyễn Hoàng Vũ', '2252919', 10000),
-- ('2025-04-02', '59A-11111', 'IN', '2025-04-02 08:00:00', '2025-04-02 10:30:00', '2025-04-02 02:30:00', 'Nguyễn Hoàng Vũ', '2252919', 13000),
-- ('2025-04-03', '59A-11111', 'IN', '2025-04-03 09:00:00', '2025-04-03 11:00:00', '2025-04-03 02:00:00', 'Nguyễn Hoàng Vũ', '2252919', 10000),
-- ('2025-04-04', '59A-11111', 'IN', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Nguyễn Hoàng Vũ', '2252919', 10000),

-- -- Student 2252096
-- ('2025-04-01', '59B-22222', 'IN', '2025-04-01 08:00:00', '2025-04-01 09:30:00', '2025-04-01 01:30:00', 'Bùi Đức Mạnh Cường', '2252096', 8000),
-- ('2025-04-02', '59B-22222', 'IN', '2025-04-02 09:00:00', '2025-04-02 11:00:00', '2025-04-02 02:00:00', 'Bùi Đức Mạnh Cường', '2252096', 10000),
-- ('2025-04-03', '59B-22222', 'IN', '2025-04-03 07:30:00', '2025-04-03 09:00:00', '2025-04-03 01:30:00', 'Bùi Đức Mạnh Cường', '2252096', 8000),
-- ('2025-04-04', '59B-22222', 'IN', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Bùi Đức Mạnh Cường', '2252096', 10000),

-- -- Student 2252608
-- ('2025-04-01', '59C-33333', 'IN', '2025-04-01 08:15:00', '2025-04-01 09:45:00', '2025-04-01 01:30:00', 'Hoàng Văn Phi', '2252608', 8000),
-- ('2025-04-02', '59C-33333', 'IN', '2025-04-02 09:15:00', '2025-04-02 11:15:00', '2025-04-02 02:00:00', 'Hoàng Văn Phi', '2252608', 10000),
-- ('2025-04-03', '59C-33333', 'IN', '2025-04-03 08:30:00', '2025-04-03 10:00:00', '2025-04-03 01:30:00', 'Hoàng Văn Phi', '2252608', 8000),
-- ('2025-04-04', '59C-33333', 'IN', '2025-04-04 09:45:00', '2025-04-04 11:45:00', '2025-04-04 02:00:00', 'Hoàng Văn Phi', '2252608', 10000),

-- -- Student 2252263
-- ('2025-04-01', '59D-44444', 'IN', '2025-04-01 07:45:00', '2025-04-01 09:15:00', '2025-04-01 01:30:00', 'Trần Duy Đức Huy', '2252263', 8000),
-- ('2025-04-02', '59D-44444', 'IN', '2025-04-02 08:30:00', '2025-04-02 10:30:00', '2025-04-02 02:00:00', 'Trần Duy Đức Huy', '2252263', 10000),
-- ('2025-04-03', '59D-44444', 'IN', '2025-04-03 09:00:00', '2025-04-03 10:30:00', '2025-04-03 01:30:00', 'Trần Duy Đức Huy', '2252263', 8000),
-- ('2025-04-04', '59D-44444', 'IN', '2025-04-04 08:00:00', '2025-04-04 10:00:00', '2025-04-04 02:00:00', 'Trần Duy Đức Huy', '2252263', 10000),

-- -- Student 2252293
-- ('2025-04-01', '59E-55555', 'IN', '2025-04-01 07:30:00', '2025-04-01 09:30:00', '2025-04-01 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-02', '59E-55555', 'IN', '2025-04-02 08:00:00', '2025-04-02 10:00:00', '2025-04-02 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-03', '59E-55555', 'IN', '2025-04-03 09:00:00', '2025-04-03 11:00:00', '2025-04-03 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000),
-- ('2025-04-04', '59E-55555', 'IN', '2025-04-04 10:00:00', '2025-04-04 12:00:00', '2025-04-04 02:00:00', 'Huỳnh Mai Quốc Khang', '2252293', 10000);





-- INSERT IGNORE INTO `SPSO` (`username`, `password`)
-- VALUES
-- ('spso1', 'password1');

-- INSERT IGNORE INTO `maintenance` (`content`, `date_update`)
-- VALUES
-- ('Ahahahahahahahahahhahahaahahahhahahahahahahahahahaha', '2024-11-25 15:30:30');

-- INSERT IGNORE INTO `Printer` (`num_paper`, `location`, `status`, `printer_name`, `ip`)
-- VALUES
--   (100, '402A5-CS1', 'Bật', 'Printer A5', '192.168.1.1'),
--   (200, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (110, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
--   (105, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (300, '402A1-CS1', 'Bảo trì', 'Printer A1', '192.168.1.5'),
--   (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
--   (200, '402A3-CS2', 'Tắt', 'Printer A3', '192.168.1.3'),
--   (100, '402A5-CS2', 'Bảo trì', 'Printer A5', '192.168.1.1'),
--   (110, '402A6-CS2', 'Bật', 'Printer A6', '192.168.1.6'),
--   (102, '402A7-CS1', 'Tắt', 'Printer A7', '192.168.1.7'),
--   (101, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (105, '402A4-CS2', 'Bật', 'Printer A4', '192.168.1.2'),
--   (100, '402A5-CS1', 'Tắt', 'Printer A5', '192.168.1.1'),
--   (140, '402A7-CS1', 'Bảo trì', 'Printer A7', '192.168.1.7'),
--   (150, '402A5-CS2', 'Bật', 'Printer A5', '192.168.1.1'),
--   (50, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (105, '402A3-CS2', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (100, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4');
--   



-- INSERT IGNORE INTO `Request` 
-- (`file_name`, `paper_size`, `num_copies`, `side_option`, `selected_pages`, `status`, `start_date`, `end_date`, `received_date`, `student_send`, `printer_id`)
-- VALUES
-- ('assignment1.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-11-01', '2024-11-02', '2024-11-03', 'student1', 1),
-- ('report2.pdf', 'A3', 1, 2 , '"all"', "Chưa nhận", '2024-11-02', '2024-11-03', NULL, 'student1', 2),
-- ('notes3.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-11-03', '2024-11-04', '2024-11-05', 'student5', 3),
-- ('project4.pdf', 'A3', 4, 1, '"all"', "Chưa nhận", '2024-11-04', '2024-11-05', NULL, 'student3', 4),
-- ('document5.doc', 'A4', 1, 1, '"even"', "Đã nhận", '2024-11-05', '2024-11-06', '2024-11-07', 'student1', 5),
-- ('assignment6.pdf', 'A3', 2, 2, '"all"', "Đang in", '2024-11-06', NULL, NULL, 'student3', 6),
-- ('summary7.doc', 'A4', 5, 1, '"all"', "Đã nhận", '2024-11-07', '2024-11-08', '2024-11-09', 'student1', 7),
-- ('presentation8.pdf', 'A3', 3, 2, '"all"', "Chưa nhận", '2024-11-08', '2024-11-09', NULL, 'student4', 8),
-- ('report9.doc', 'A4', 4, 2, '"all"', "Đã nhận", '2024-11-09', '2024-11-10', '2024-11-11', 'student5', 9),
-- ('notes10.pdf', 'A3', 1, 2, '"even"', "Chưa nhận", '2024-11-10', '2024-11-11', NULL, 'student1', 10),
-- ('assignment2.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-11-01', '2024-11-02', '2024-11-03', 'student2', 1),
-- ('notes10.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-11-03', '2024-11-04', '2024-11-05', 'student2', 3),
-- ('assignment1.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-12-01', '2024-12-02', '2024-12-03', 'student1', 1),
-- ('report2.pdf', 'A3', 1, 2 , '"even"', "Chưa nhận", '2024-12-02', '2024-12-03', NULL, 'student1', 2),
-- ('notes3.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-12-03', '2024-12-04', '2024-12-05', 'student5', 3),
-- ('project4.pdf', 'A3', 4, 1, '"odd"', "Chưa nhận", '2024-12-04', '2024-12-05', NULL, 'student3', 4),
-- ('document5.doc', 'A4', 1, 1, '"all"', "Đã nhận", '2024-12-05', '2024-12-06', '2024-11-07', 'student1', 5),
-- ('assignment6.pdf', 'A3', 2, 2, '"all"', "Đang in", '2024-12-06', NULL, NULL, 'student3', 6),
-- ('summary7.doc', 'A4', 5, 1, '"all"', "Đã nhận", '2024-12-07', '2024-12-08', '2024-12-09', 'student1', 7),
-- ('presentation8.pdf', 'A3', 3, 2, '"all"', "Chưa nhận", '2024-12-08', '2024-11-09', NULL, 'student4', 8),
-- ('report9.doc', 'A4', 4, 2, '"all"', "Đã nhận", '2024-12-09', '2024-12-10', '2024-12-11', 'student5', 9),
-- ('notes10.pdf', 'A3', 1, 2, '"odd"', "Chưa nhận", '2024-12-10', '2024-12-11', NULL, 'student1', 10),
-- ('assignment2.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-12-01', '2024-12-02', '2024-12-03', 'student2', 1),
-- ('notes10.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-12-03', '2024-12-04', '2024-12-05', 'student2', 3);



