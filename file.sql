DROP PROCEDURE selectAll;
DROP PROCEDURE edit;
DROP PROCEDURE delete_customer;
DROP PROCEDURE insert_customer;
DROP PROCEDURE update_customer;

DELIMITER //
CREATE PROCEDURE selectAll()
	BEGIN
		SELECT * FROM customer;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE edit(in cust_id int)
	BEGIN
	 SELECT * FROM customer where id=cust_id;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_customer(in cust_id int)
	BEGIN
		DELETE FROM customer WHERE id=cust_id;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insert_customer(in cust_name varchar(200),
								in cust_address text,
								in cust_email varchar(200),
								in cust_phone varchar(20)
)
	BEGIN
	 INSERT INTO customer (name,address,email,phone) values(cust_name,cust_address,cust_email,cust_phone);
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_customer(in cust_name varchar(200),
								in cust_address text,
								in cust_email varchar(200),
								in cust_phone varchar(20),
								in cust_id int)
	BEGIN
		UPDATE customer SET name=cust_name,address=cust_address,
							email=cust_email,phone=cust_phone WHERE
							id=cust_id;
	END //
DELIMITER;
