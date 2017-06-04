
-- Database: `mydb`

-- Stable structure `customer`

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT 	PRIMARY KEY,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL
);


INSERT INTO `customer` (`id`, `name`, `address`, `email`, `phone`) VALUES
(1, 'sen', 'khulna', 'sen@gmail.com', '1234545');


