CREATE TABLE `employee` (
	`emp_id` INT(10) NOT NULL AUTO_INCREMENT,
	`citizen_id` CHAR(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`degree` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`dob` DATE,
	`position` VARCHAR(50) CHARACTER SET utf16 COLLATE utf16_unicode_520_ci,
	`salary` FLOAT(10, 2),
	`address` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`email` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`phone` CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`fname` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`lname` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`gender` ENUM('Female','Male','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`username` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`password` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`role` varchar(100),
	PRIMARY KEY (`emp_id`),
	UNIQUE(`citizen_id`)
);

CREATE TABLE `tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`)
);

CREATE TABLE `partner` (
	`par_id` INT(10) NOT NULL AUTO_INCREMENT,
	`delivery_address` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`company_name` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`par_fname` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`par_lname` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`legal_address` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`type` ENUM('Customer',
'Supplier') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`email1` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`email2` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`phone1` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`phone2` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`description` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	PRIMARY KEY (`par_id`)
);

CREATE TABLE `transaction` (
    `tran_id` INT(10) NOT NULL AUTO_INCREMENT,
    `delivery_date` DATE,
    `credit` FLOAT(16,2),
    `payment_method` ENUM('Cash','Cheque','Creditcard') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
    `payment_status` ENUM('Complete','Incomplete') CHARACTER SET utf8 COLLATE utf8_unicode_520_ci,
    `credit_due_date` DATE,
    `transaction_date` DATE,
    `delivery_status` BOOLEAN,
    `type` ENUM('PURCHASE','SALE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
    `employee_emp_id` INT(10) NOT NULL,
    `partner_par_id` INT(10) NOT NULL,
    PRIMARY KEY (`tran_id`)
);

CREATE TABLE `purchase` (
	`transaction_tran_id` INT(10),
	`receive_date` DATE,
	PRIMARY KEY (`transaction_tran_id`)
);

CREATE TABLE `sale` (
	`test_status` BOOLEAN,
	`transaction_tran_id` INT(10),
	PRIMARY KEY (`transaction_tran_id`)
);

CREATE TABLE `sale_test_date` (
	`sale_tran_id` INT(10),
	`sale_no` INT(10),
	`test_date` DATE,
	PRIMARY KEY (`sale_tran_id`,`sale_no`)
);

CREATE TABLE `product_transaction` (
    `product_pro_id` INT(10),
    `transaction_tran_id` INT(10),
    `price` FLOAT(16, 2),
    `count` INT(10),
    PRIMARY KEY (`product_pro_id`,`transaction_tran_id`)
);

CREATE TABLE `spare_part` (
    `product_pro_id` INT(10),
    `piece_per_pack` INT(10),
    PRIMARY KEY (`product_pro_id`)
);

CREATE TABLE `machine` (
	`product_pro_id` INT(10),
	`warranty_date` DATE,
	`mac_id` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	PRIMARY KEY (`product_pro_id`)
);


CREATE TABLE `product` (
	`pro_id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(100),
	`mfd` DATE,
	`brand` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`type` ENUM('MACHINE', 'SPARE_PART') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
	`amount` INT(10),
	PRIMARY KEY (`pro_id`)
);

ALTER TABLE `transaction`
ADD CONSTRAINT employee_emp_id_transaction
FOREIGN KEY (employee_emp_id)
REFERENCES `employee` (emp_id);

ALTER TABLE `transaction`
ADD CONSTRAINT partner_par_id_transaction
FOREIGN KEY (partner_par_id)
REFERENCES `partner` (par_id);

ALTER TABLE `tokens`
ADD CONSTRAINT tokens_fk
FOREIGN KEY (user_id)
REFERENCES `employee` (emp_id);

ALTER TABLE `purchase`
ADD CONSTRAINT transaction_tran_id_purchase
FOREIGN KEY (transaction_tran_id)
REFERENCES `transaction` (tran_id);

ALTER TABLE `sale`
ADD CONSTRAINT transaction_tran_id_sale
FOREIGN KEY (transaction_tran_id)
REFERENCES `transaction` (tran_id);

ALTER TABLE `sale_test_date`
ADD CONSTRAINT sale_test_date_pro_id_sale
FOREIGN KEY (sale_tran_id)
REFERENCES `sale` (transaction_tran_id);

ALTER TABLE `product_transaction`
ADD CONSTRAINT product_transaction_tran_id_transaction
FOREIGN KEY (transaction_tran_id)
REFERENCES `transaction` (tran_id);

ALTER TABLE `product_transaction`
ADD CONSTRAINT product_transaction_pro_id_product
FOREIGN KEY (product_pro_id)
REFERENCES `product` (pro_id);

ALTER TABLE `machine`
ADD CONSTRAINT machine_pro_id_product
FOREIGN KEY (product_pro_id)
REFERENCES `product` (pro_id);

ALTER TABLE `spare_part`
ADD CONSTRAINT spare_part_pro_id_product
FOREIGN KEY (product_pro_id)
REFERENCES `product` (pro_id);

INSERT INTO employee(`citizen_id`, `degree`, `dob`, `position`, `salary`, `address`, `email`, `phone`, `fname`, `lname`, `gender`, `username`, `password`, `role`)
VALUES
('6035995261732', 'ประถมศึกษา', '1970-03-12', 'CEO', 50000, '1055/645 R C K Tower 31Th Floor 3122 Room Silom Road Bangkok 10322', 'taweesak@gmail.com', '0941234789', 'ทวีศักดิ์', 'เตมียชาติ', 'Male', 'taweesak1479', 'kaseewat9741', 'admin'),
('1311095773406', 'ปริญญาตรี', '1978-01-19', 'Programmer', 35000, '86 Soi Wat Nangnong Vuthakart Bang Kor Chomthong Bangkok 10328', 'tarann_nc@hotmail.com', '0845589454', 'ตรัณ', 'นิมบุญจาช', 'Male', 'taran19178', 'cAllmynaMepls%19178%', 'admin'),
('5394171469072', 'ปริญญาโท', '1983-01-23', 'Sales', 40000, '81/15 Soi Prachasanti Dindang Din Daeng Din Daeng Bangkok 10320', 'boonshern@hotmail.com', '026434136', 'บุญเชิด', 'ชื่นเจริญ', 'Male', 'Somematim', 'ou7naeJ3', 'user'),
('1722387961019',  'ประถมศึกษา', '1977-02-27', 'Mechanic', 30000, '127/49 St Louis Soi 3 Chan Rd Thung Wat Don Sathon Bangkok 10120', 'Simp@gmail.com', '0966781234', 'ขันธ์', 'ดาบสีพาย',  'Male',  null,  null,  null),
('1311056779811', 'มัธยมศึกษาตอนปลาย', '1974-10-03', 'Housekeeper', 18000, 'B 28 Soi Taladchaimongkon Ratchaprarob Thung Phyathai Ratcha Thewi Bangkok', 'Areerutt_2517@hotmail.com', '0819261814', 'อารีรัตน์', 'บัวหลวง', 'Female', null, null,  null),
('5394288562111', 'มัธยมศึกษาตอนปลาย', '1974-11-28', 'Mechanic', 20000, '92/19 Soi Pattanakarn 40 Pattanakarn Road Bangkok 10250', 'Apichdee@hotmail.com', '0627229702', 'บุญเติม ', 'ทาสีเพชร', 'Male', null, null,  null),
('6034558981011', 'ปริญญาตรี', '1979-05-31', 'Admin', 42000, '567/18-9 Soi Wat Maiphiren Issarapharp Wat Thapra Bangkok Yai Bangkok 10600', 'Apitchadee_bl@gmail.com', '0867056612', 'ศศิธร', 'แสงพิมา', 'Male', 'Apcd315', 'ApicH@d1',  null),
('1231322456546', 'ปริญญาตรี', '1983-01-23', 'Head Mechanic', 40000, '2328/40 Ramkamhaeng 52/2 Huamark 10240', 'odds4loif@gmail.com', '0123874563', 'อภิชดี ', 'บุญเรือง', 'Male', null, null,  null),
('3306525383066', 'มัธยมศึกษาตอนต้น', '1982-08-02', 'Accountant', 25000, '61/2 Soi Sai Nam Thip Sukhumvit Soi 22 Bangkok 10110', 'orakrawee42@hotmail.com', '0822597138', 'อรกวี', 'เมืองทอง', 'Female', 'orakrawee', '9QNUA5KzAt5N',  null),
('6034225190623', 'ปริญญาตรี', '1994-7-21', 'Mechanic', '27000' ,'Maha Ploed Tharam Bang Rak', 'pl_jom68l@gmail.com', '0827656649', 'ไพโรจน์', 'จอมดำสิงห์', 'Male', null, null,  null);

INSERT INTO product( `title`, `mfd`, `brand` ,`type`, `amount`)
VALUES
('เครื่องตัดไม้ OPTIMIZING CUT OFF SIMPLE', '2020-09-24', 'CARPENTER', 'MACHINE', 2),
('เครื่องตัดไม้ OPTIMIZING CUT OFF PUSH', '2020-09-29', 'CARPENTER', 'MACHINE', 2 ),
('เครื่องเหลาไม้กลม DOWEL MILLING MACHINE', '2018-03-02', 'CHING FENG', 'MACHINE', 2),
('เครื่องเหลาไม้กลม ROUND ROD MILLING', '2014-07-22', 'CHING FENG', 'MACHINE', 2),
('เร้าเตอร์และเพลาตั้ง SINGLE SPINDLE SHAPER(RH-113)', '2003-04-12', 'RHSin',  'MACHINE', 2 ),
('เครื่องตัดไม้ INTEGRAL SALAD ADAPTER', '2013-09-24', 'CARPENTER',  'MACHINE', 2  ),
('เครื่องเจาะไม้ Two unit boring machine', '2015-05-12', 'RHSin',  'MACHINE', 2 ),
('เครื่องเจาะไม้ Double End Multiple Spindle', '2019-01-30', 'RHSin', 'MACHINE', 2 ),
('เครื่องตัดหัวท้ายแบบแมนนวล RH-646ART', '2013-08-22', 'RHSin',  'MACHINE', 2  ),
('เครื่องตัดหัวท้ายแบบอัตโนมัติ A-Economy', '2017-02-12', 'RHSin',  'MACHINE', 2  ),
('ใบเลื่อยคาร์ไบด์ INDIVIDUAL EDGE TRIMMING SAW', '2020-08-02', null,  'SPARE_PART', 2  ),
('ใบเลื่อยคาร์ไบด์ CROSS CUT SAW BLADE', '2020-05-15', null,  'SPARE_PART', 2  ),
('ใบเลื่อยคาร์ไบด์ RIP CUT SAW BLADE WITH WING', '2021-01-02', null,  'SPARE_PART', 2  ),
('ดอกเจาะ STRAIGHT SHANK SOLID MORTISING TOOL', '2021-03-12', null,  'SPARE_PART', 2),
('ดอกเจาะ INTEGRAL SALAD ADAPTER', '2020-09-16', null,  'SPARE_PART', 2  ),
('ดอกเร้าเตอร์ ROUTER BITS', '2020-11-04', null,  'SPARE_PART', 2  ),
('หัวเกียร์ 2-Spindle Boring Head', '2019-01-01', null,  'SPARE_PART', 2  ),
('หัวเกียร์ 3-Spindle (Circular) Boring Head', '2019-01-03', null,  'SPARE_PART', 2  ),
('หัวเกียร์ 3-Spindle (Linear) Boring Head', '2021-02-14', null,  'SPARE_PART', 2  ),
('หัวเกียร์ Quick Chucks for Line Boring Head', '2020-01-21', null,  'SPARE_PART', 2  );

INSERT INTO machine( `mac_id`, `warranty_date`, `product_pro_id`)
VALUES
('d312a930bc', '2021-09-24', 1),
('e147rk79cv', '2021-09-29', 2),
('f334g291ac', '2019-03-02', 3),
('pkmr42206i', '2019-03-02', 4),
('aa4382u67b', '2005-04-12', 5),
('afkzc0oiq3', '2014-09-24', 6),
('tya2016dtc', '2016-05-12', 7),
('r482a772fl', '2021-01-30', 8),
('a42zy01543', '2014-08-22', 9),
('ta5443dd2f', '2017-02-12', 10);

INSERT INTO spare_part( `product_pro_id`,`piece_per_pack`)
VALUES
(11, 5),
(12, 5),
(13, 5),
(14, 20),
(15, 20),
(16, 20),
(17, 1),
(18, 1),
(19, 1),
(20, 1);

INSERT INTO partner(`delivery_address`, `company_name`, `par_fname`, `par_lname`, `legal_address`, `type`, `email1`, `email2`, `phone1`, `phone2`, `description`)
VALUES
(null, 'Biesse', 'Gerardino', 'Russo', 'Via della Meccanica, 16, 61122 Pesaro PU, Italy', 'Supplier', 'biesse.marketing@biesse.com', null, '0721439100', '0721453248', "Biesse is the Group's business unit specialising in the woodworking segment.
Since 1969, it has designed, manufactured and marketed a comprehensive range of technologies and solutions for joiners and large furniture, windows, doors and wood building components manufacturers. In recent years, it has also been active in the plastic processing machinery sector, developing ad-hoc solutions for a growing market."),

(null, 'WM engineering', 'William', 'Miller', '42/9 Moo 1 Bueng Kham Phroi, Lam Luk Ka District, Pathum Thani 12150', 'Supplier', 'SARAH.WMMETAL@GMAIL.COM',  'WMMETALFURNITURE@GMAIL.COM', '60118468015', null, 'about Corporation Offices, Restaurants, Private Residential, Exhibition Hall, Retail Outlets, Hospital'),
(null, 'Euro Tech', 'Adelchi', 'Bruno', '216/4 Charoen Krung 43 Alley, Khwaeng Suriya Wong, Khet Bang Rak, Krung Thep Maha Nakhon 10500', 'Supplier', 'jane.doe@eurotech.com', null, '8005412003', '8943344650', 'This diverse range of home furnishings for living rooms, dining rooms, bedrooms, kitchens, and bathrooms features world-renowned brands such as Cassina, Giorgetti, Molteni&C, Dada, Natuzzi Italia, Calligaris, Rolf Benz, Limited Edition, Gessi, Gallotti & Radice, and Christopher Guy.'),
(null, 'CARPENTER', 'Gillian', 'Finch', '5016 Monument Ave., Richmond, VA 23230', 'Supplier', null, null, '804-359-0800', null, 'designers and furniture manufacturers was joining forces for crafting functional and visually flawless furniture pieces. Be it a kitchen furniture, bedroom furniture or just some garden chairs & tables'),
(null, 'RHSin', 'Luoyang', 'Cui', 'No. 6, Alley 2, Lane 396, Sec. 2, SAN FENG RD., FENG YUAN, TAICHUNG 42073, TAIWAN', 'Supplier', 'rh9330@ms64.hinet.net', null, '886-4-25223653.25290758', null, 'furniture made from natural by experience craftsman'),
(null, 'CHING FENG', 'Feng', 'Wang', '373, Yan Hai Rd., Sec. 4, Fushing Hsiang​, Changhua, 50642 Taiwan', 'Supplier', 'sales1@cfmm.com.tw', null, '886-4-7801967', null, 'wooden furniture craftsmanship experience'),
('26/11 Sala Thammasop, Thawi Watthana, Bangkok 10170', 'AP furniture', 'Ung', 'Sriwarunyu', '26/11 Sala Thammasop, Thawi Watthana, Bangkok 10170', 'Customer', 'sales@apfurniture.com.au', null, '028852592', '0803262694', 'ผู้ผลิตและจำหน่ายเฟอร์นิเจอร์ในครัวเรือน เฟอร์นิเจอร์สำนักงานต่างๆ ด้วยประสบการณ์ในการดำเนินการมากกว่า 50 ปี เราพร้อมที่จะส่งมอบความพึงพอใจให้กับลูกค้าทั้งในประเทศ และต่างประเทศ ด้วยปรัชญาการทำงานของเราที่ว่า'),
('21/4 หมู่ 3 Ekkachai Rd, Khok Krabue, เมือง, Samut Sakhon 74000', 'บ้านสุข Design', 'Chatchom', 'Ariyanuntaka', '21/4 หมู่ 3 Ekkachai Rd, Khok Krabue, เมือง, Samut Sakhon 74000', 'Customer', 'info@baansook.com', null, '0962946365', null, 'การติดตั้งส่วนประกอบอาคารและการตกแต่งภายใน บริการออกแบบ และตกแต่งภายใน'), 
('136 Moo 6 T.Taweewattana A.sainoi Nonthaburi Thailand 11150', 'PSP furniture', 'Putti', 'Rattananuntawatee', '136 Moo 6 T.Taweewattana A.sainoi Nonthaburi Thailand 11150', 'Customer', 'pspfurniture@hotmail.com', null, '6627895577', '086-7747827', 'P.S.P FURNITURE & DESIGN CO., LTD is the leading in various kinds of Furniture manufacturer in Thailand. As the well-know in High in various kinds of Furniture'),
('Khun Thanawan 20/3 Sukhumvit Soi 23 Bangkok 10110 Bangkok', 'ต่อเอง', 'Jettrin', 'Pichit', 'Khun Thanawan 20/3 Sukhumvit Soi 23 Bangkok 10110 Bangkok', 'Customer', 'torservice@gmail.com', null, '091-7584123', null, 'ให้บริการติดตั้งส่วนประกอบเฟอร์นิเจอร์และการตกแต่งภายในเน้นบรรการโดยธรรมชาติ วัสดุจากไม้'),
( '81/432 หมู่ 5 ต.ลาดสวาย อ.ลำลูกกา จ.ปทุมธานี 12150', 'Decco Enterprise', 'Choochai', 'Thanom', '81/432 หมู่ 5 ต.ลาดสวาย อ.ลำลูกกา จ.ปทุมธานี 12150', 'Customer', 'decco.sale@gmail.com', 'Sale.deccothai@gmail.com', '094-4509090', '091-9614556', 'บริการจัดหาเฟอร์นิเจอร์ตามความต้องลูกค้า พร้อมบริการออกแบบ ตกแต่งและติดตั้งเฟอร์นิเจอร์');

INSERT INTO transaction(`delivery_date`, `credit`, `payment_method`, `payment_status`, `credit_due_date`, `transaction_date`, `delivery_status`, `type`, `employee_emp_id`, `partner_par_id`)
VALUES 
('2021-06-15', 0, 'cheque', 'Complete', '2021-04-01', '2021-02-26', false, 'Sale', 1, 7),
('2020-03-19', 0, 'cheque', 'Complete', '2020-01-31', '2020-01-03', true, 'SALE', 6, 9),
('2021-08-02', 15.69, 'cheque', 'Incomplete', '2021-10-31', '2021-05-03', false, 'SALE', 9, 8),
('2020-07-14', 0, 'cheque', 'Complete', '2020-12-14', '2020-03-07', true, 'SALE', 6, 9), 
('2021-05-01', 15000000, 'cheque', 'Incomplete', '2021-07-30', '2021-07-29', false, 'Sale', 4, 10),
('2022-08-12', 1822830.50, 'cheque', 'Incomplete', '2022-04-10', '2018-12-24', false, 'Sale',  10, 11),
('2019-10-11', 0, 'cheque', 'Complete', '2019-07-31', '2019-02-23', true, 'SALE', 2, 10),
('2011-04-14', 0, 'cheque', 'Complete', '2012-06-16', '2011-01-06', true, 'SALE', 3, 8), 
('2016-11-01', 127220, 'cheque', 'Incomplete', '2015-10-30', '2015-02-20', true, 'Sale', 3, 8),
('2020-05-07', 10000000, 'cheque', 'Incomplete', '2021-11-07', '2020-03-07', true, 'SALE', 7, 10),
('2020-12-14', 0, 'cheque', 'Complete', '2019-06-16', '2019-01-18', true, 'PURCHASE', 1, 6), 
('2021-08-22', 10, 'cheque', 'Incomplete', '2021-10-31', '2021-07-13', false, 'PURCHASE', 9, 3),
('2020-06-21', 0, 'creditcard', 'Complete', '2020-07-21', '2020-05-21', true, 'PURCHASE', 7, 4),
('2005-04-21', 0, 'cheque', 'Complete', '2003-10-31', '2003-01-10', true, 'PURCHASE', 8, 2),
('2015-06-23', 0, 'cheque', 'Complete', '2017-01-31', '2016-08-29', true, 'PURCHASE', 8, 2),
('2022-01-01', 1000000, 'cheque', 'Incomplete', '2021-10-31', null, false, 'PURCHASE', 9, 1),
('2013-04-13', 0, 'cheque', 'Complete', '2012-08-20', '2012-08-20', true, 'PURCHASE', 7, 5), 
('2021-06-13', 1283200.50, 'cheque', 'Incomplete', '2021-06-01', '2021-02-13', false, 'PURCHASE', 4, 3), 
('2022-06-21', 0, 'cheque', 'Complete', '2022-01-31', '2021-04-21', false, 'PURCHASE', 2, 2),
(null, 100, 'cash', 'Incomplete', '2019-12-31', '2019-05-31', false, 'PURCHASE', 2, 6);

INSERT INTO sale(`transaction_tran_id`, `test_status`)
VALUES 
(2, true),
(1, true),
(3, true),
(4, false),
(5, false),
(6, false),
(7, false),
(9, false),
(8, false),
(10, false);

INSERT INTO sale_test_date(`sale_tran_id`, `sale_no`, `test_date`)
VALUES
(5, 1, '2021-03-17'),
(3, 1, '2021-07-25'),
(1, 1, '2021-05-11'),
(1, 2, '2021-05-17'),
(2, 1, '2020-02-27'),
(10, 1, '2020-05-01'),
(9, 1, '2016-10-10'),
(5, 2, '2021-03-24'),
(5, 3, '2021-04-11'),
(3, 2, '2021-07-30'),
(4, 1, '2021-07-01');

INSERT INTO purchase(`transaction_tran_id`, `receive_date`)
VALUES
(11, '2020-12-21'),
(13, '2020-06-30'),
(12, null),
(17, '2013-04-29'),
(14, '2005-04-28'),
(15, '2015-07-13'),
(16, null),
(19, null),
(18, null),
(20, null);

INSERT INTO PRODUCT_TRANSACTION(`product_pro_id`, `transaction_tran_id`, `price`, `count`)
VALUES
(1, 1, 4000000, 2),
(3, 1, 1865000, 1),
(3, 3, 1865000, 1),
(5, 2, 450000, 10),
(6, 5, 3150000, 1),
(8, 9, 4550000, 1),
(9, 1, 1500000, 1),
(10, 1, 12000000, 4),
(10, 5, 4765000, 2),
(11, 4, 40000, 2),
(12, 7, 750000, 30),
(13, 6, 50000, 1),
(14, 6, 150000, 10),
(15, 7, 960000, 40),
(15, 10, 120000, 5),
(17, 2, 30000, 1),
(17, 6, 150000, 5),
(17, 8, 900000, 30),
(18, 6, 2100000, 3),
(19, 6, 240000, 2),
(20, 6, 300000, 1),
(1, 11, 3525000, 2),
(1, 14, 1762500, 1),
(1, 18, 3525000, 2),
(2, 17, 3150000, 2),
(3, 11, 1575000, 1),
(4, 17, 1250000, 1),
(5, 19, 434604, 12),
(6, 13, 2250000, 1),
(6, 16, 4500000, 2),
(7, 20, 3155200, 2),
(8, 20, 3850000, 1),
(9, 11, 3136000, 2),
(10, 11, 7600000, 4),
(10, 13, 3800000, 2),
(11, 13, 350000, 20),
(12, 15, 800000, 40),
(13, 12, 160000, 4),
(14, 12, 100000, 10),
(14, 14, 1000000, 100),
(15, 13, 1000000, 50),
(15, 15, 1000000, 50),
(16, 16, 20000, 1),
(17, 12, 125000, 5),
(17, 16, 250000, 10),
(18, 12, 150000, 3),
(19, 12, 200000, 2),
(20, 12, 400000, 2),
(20, 16, 2000000, 10);
