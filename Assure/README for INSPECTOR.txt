The Complete project is inside the Assure_life_insurance folder.
Please note that even the static pages dont open unless the apache server is turned on. Need to go using localhost url.
We have used the PHP Mailer Library in order to send emails.(Mentioned in comments at relevant points)
We have used a jquery library in order to display the buy product multi step form.(Mentioned in comments at relevant points)
Also the project will not work unless the database is not present.
The query required for the website is mentioned below.

------------------------SQL Query---------------------------------------

SET SQL_SAFE_UPDATES = 0;
-- Create Table policy_type
CREATE TABLE policy_type (
  policy_type_id INT,
  policy_type VARCHAR(45),
  PRIMARY KEY (policy_type_id)
  );

-- Create Table policy
CREATE TABLE policy (
  policy_id INT,
  policy_name VARCHAR(45),
  description VARCHAR(400),
  base_premium FLOAT,
  policy_type_id INT,
  PRIMARY KEY (policy_id),
  CONSTRAINT fk_policy_policy_type FOREIGN KEY (policy_type_id) REFERENCES policy_type (policy_type_id)
	);


-- Create Table user_type
CREATE TABLE user_type (
  user_type_id INT,
  user_type VARCHAR(45),
  PRIMARY KEY (user_type_id)
  );

-- Create Table user
CREATE TABLE `user` (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45),
  password VARCHAR(45),
  user_type_id INT,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_user_user_type1 FOREIGN KEY (user_type_id) REFERENCES user_type (user_type_id)
	);


-- Create Table policy_holder
CREATE TABLE policy_holder (
  policy_holder_id VARCHAR(45),
  full_name VARCHAR(80),
  title VARCHAR(45),
  initials_name VARCHAR(45),
  nic VARCHAR(45),
  dob DATE,
  gender VARCHAR(45),
  marital_status VARCHAR(45),
  address VARCHAR(100),
  mobile VARCHAR(45),
  email VARCHAR(45),
  occupation VARCHAR(45),
  work_company VARCHAR(45),
  img VARCHAR(100),
  user_id INT,
  PRIMARY KEY (policy_holder_id),
  CONSTRAINT fk_policy_holder_user1 FOREIGN KEY (user_id) REFERENCES `user` (user_id)
	);


-- Create Table policies
CREATE TABLE policies (
  p_id INT NOT NULL AUTO_INCREMENT,
  policy_holder_id VARCHAR(45),
  policy_id INT,
  duration INT,
  premium FLOAT,
  date DATE,
  status INT,
  PRIMARY KEY (p_id),
  CONSTRAINT fk_policies_policy1 FOREIGN KEY (policy_id) REFERENCES policy (policy_id),
  CONSTRAINT fk_policies_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table beneficiary
CREATE TABLE beneficiary (
  beneficiary_id INT NOT NULL AUTO_INCREMENT,
  beneficiary_name VARCHAR(45),
  title VARCHAR(45),
  initials_name_beneficiary VARCHAR(45),
  nic VARCHAR(45),
  gender VARCHAR(45),
  marital_status VARCHAR(45),
  dob DATE,
  relation VARCHAR(45),
  address VARCHAR(100),
  mobile VARCHAR(45),
  email VARCHAR(45),
  img VARCHAR(100),
  p_id INT,
  user_id INT,
  PRIMARY KEY (beneficiary_id),
  CONSTRAINT fk_beneficiary_user1 FOREIGN KEY (user_id) REFERENCES `user` (user_id),
  CONSTRAINT fk_beneficiary_policies1 FOREIGN KEY (p_id) REFERENCES policies (p_id)
	);


-- Create Table employee_type
CREATE TABLE employee_type (
  employee_type_id INT,
  occupation VARCHAR(45),
  salary FLOAT,
  PRIMARY KEY (employee_type_id)
  );


-- Create Table employee
CREATE TABLE employee (
  employee_id VARCHAR(45),
  full_name VARCHAR(45),
  title VARCHAR(45),
  initial_name VARCHAR(45),
  gender VARCHAR(45),
  marital_status VARCHAR(45),
  dob DATE,
  nic VARCHAR(45),
  address VARCHAR(45),
  mobile VARCHAR(45),
  email VARCHAR(45),
  img VARCHAR(100),
  employee_type_id INT,
  user_id INT,
  PRIMARY KEY (employee_id),
  CONSTRAINT fk_employee_user1 FOREIGN KEY (user_id) REFERENCES `user` (user_id),
  CONSTRAINT fk_employee_employee_type1 FOREIGN KEY (employee_type_id) REFERENCES employee_type (employee_type_id)
	);


-- Create Table bank_details
CREATE TABLE bank_details (
  bank_details_id INT NOT NULL AUTO_INCREMENT,
  account_no VARCHAR(45),
  account_name VARCHAR(45),
  branch VARCHAR(45),
  bank VARCHAR(45),
  policy_holder_id VARCHAR(45),
  PRIMARY KEY (bank_details_id),
  CONSTRAINT fk_bank_details_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table medical_details
CREATE TABLE medical_details (
  medical_details_id INT NOT NULL AUTO_INCREMENT,
  policy_holder_id VARCHAR(45),
  q1 INT,
  q2 INT,
  q3 INT,
  q4 INT,
  q5 INT,
  q6 INT,
  q7 INT,
  q8 INT,
  q9 INT,
  q10 INT,
  PRIMARY KEY (medical_details_id),
  CONSTRAINT fk_medical_details_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table premium
CREATE TABLE premium (
  premium_id INT NOT NULL AUTO_INCREMENT,
  p_id INT,
  payment_method VARCHAR(45),
  bank_slip VARCHAR(100),
  amount FLOAT,
  month VARCHAR(45),
  date DATE,
  PRIMARY KEY (premium_id),
  CONSTRAINT fk_premium_history_policies1 FOREIGN KEY (p_id) REFERENCES policies (p_id)
	);


-- Create Table claim
CREATE TABLE claim (
  claim_id VARCHAR(45),
  p_id INT,
  cause VARCHAR(45),
  date DATE,
  place VARCHAR(45),
  hospital VARCHAR(45),
  ward_no VARCHAR(45),
  comment VARCHAR(100),
  amount FLOAT,
  request_date DATE,
  status INT,
  PRIMARY KEY (claim_id),
  CONSTRAINT fk_claim_history_policies1 FOREIGN KEY (p_id) REFERENCES policies (p_id)
	);


-- Create Table family_details
CREATE TABLE family_details (
  family_details_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45),
  nic VARCHAR(45),
  dob DATE,
  relation VARCHAR(45),
  policy_holder_id VARCHAR(45),
  PRIMARY KEY (family_details_id),
  CONSTRAINT fk_family_details_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table additional_details
CREATE TABLE additional_details (
  additional_details_id INT NOT NULL AUTO_INCREMENT,
  policy_holder_id VARCHAR(45),
  height FLOAT,
  weight FLOAT,
  q1 INT,
  q2 INT,
  q3 INT,
  q4 INT,
  q5 INT,
  q6 INT,
  PRIMARY KEY (additional_details_id),
  CONSTRAINT fk_additional_details_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table enquiry
CREATE TABLE enquiry (
  enquiry_id INT NOT NULL AUTO_INCREMENT,
  policy_holder_id VARCHAR(45),
  enquiry VARCHAR(100),
  employee_id VARCHAR(45),
  reply VARCHAR(100),
  status INT,
  PRIMARY KEY (enquiry_id),
  CONSTRAINT fk_enquiry_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id),
  CONSTRAINT fk_enquiry_employee1 FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
	);


-- Create Table feedback
CREATE TABLE feedback (
  feedback_id INT NOT NULL AUTO_INCREMENT,
  feedback VARCHAR(400),
  status INT,
  policy_holder_id VARCHAR(45),
  PRIMARY KEY (feedback_id),
  CONSTRAINT fk_feedback_policy_holder1 FOREIGN KEY (policy_holder_id) REFERENCES policy_holder (policy_holder_id)
	);


-- Create Table proof
CREATE TABLE proof (
  proof_id INT NOT NULL AUTO_INCREMENT,
  proof VARCHAR(100),
  claim_id VARCHAR(45),
  PRIMARY KEY (proof_id),
  CONSTRAINT fk_proof_claim_history1 FOREIGN KEY (claim_id) REFERENCES claim (claim_id)
	);


-- Create Table initial_payment
CREATE TABLE initial_payment (
  initial_payment_id INT NOT NULL AUTO_INCREMENT,
  payment_method VARCHAR(45),
  bank_slip VARCHAR(100),
  amount FLOAT,
  date DATE,
  p_id INT,
  PRIMARY KEY (initial_payment_id),
  CONSTRAINT fk_initial_payment_policies1 FOREIGN KEY (p_id) REFERENCES policies (p_id)
	);


-- Create Table payout
CREATE TABLE payout (
  payout_id INT NOT NULL AUTO_INCREMENT,
  purpose VARCHAR(45),
  percentage FLOAT,
  amount FLOAT,
  date DATE,
  p_id INT,
  PRIMARY KEY (payout_id),
  CONSTRAINT fk_payout_policies1 FOREIGN KEY (p_id) REFERENCES policies (p_id)
	);


-- Insert to Table policy_type
insert into policy_type values(1,'Proterction');
insert into policy_type values(2,'Children');
insert into policy_type values(3,'Retirement');
insert into policy_type values(4,'Savings');


-- Insert to Table policy
insert into policy values(1,'Assure Shield','Covers all your hospital payments and provide coverage for death, disability and accidents.',100,1);
insert into policy values(2,'Assure Elite','Covers all your hospital payments and provide coverage for critical illnesess and disabilities.',110,1);
insert into policy values(3,'Assure Guardian','Covers all your childrens hospital payments and provide coverage for death, disability and accidents.',200,2);
insert into policy values(4,'Assure Future+','Secfure your childrens education.',210,2);
insert into policy values(5,'Assure Retirement Guard','Provide Maturity Benefit. Covers all your hospital payments and provide coverage for death, disability and accidents.',300,3);
insert into policy values(6,'Assure Savings','A great saving plan with a handy dividend.',310,4);
insert into policy values(7,'Assure Flex','A great saving plan with a handy dividend. Also have the ability pay the initial deposit flexibly',400,4);


-- Insert to Table user_type
insert into user_type values (1,'Admin');
insert into user_type values (2,'Employee');
insert into user_type values (3,'Customer');
insert into user_type values (4,'Beneficiary');


-- Insert to Table user
insert into `user` values (1,'yohan','123',1);
insert into `user` values (2,'nethmi','123',2);
insert into `user` values (3,'ishan','123',3);
insert into `user` values (4,'mahesh','123',3);
insert into `user` values (5,'akila','123',4);
insert into `user` values (6,'kasun','123',4);

-- Insert to Table policy_holder
insert into policy_holder values('PHID1','Senawirathnage Yohan Perera','Mr.','S.Yohan Perera','1999123456','1999-01-01','Male','Single','No 123,Anuradhapura,Kakirawa',0778462610,'yohan@gmail.com','Bus Driver','SLTB','sysIMG\PHID1',3);
insert into policy_holder values('PHID2','Gallage Kaveesha Nethmi','Miss.','G.Kaveesha Nethmi','2001123456','2001-10-05','Female','Married','N0 234,Embilipitiya',0701415365,'nethmikavee40@gmail.com','Software Engineer','Virtusa','sysIMG\PHID2',4);


-- Insert to Table policies
insert into policies values(1,'PHID1',1,5,5000.0,'2023-01-01',2);
insert into policies values(2,'PHID2',2,6,6000.0,'2022-01-05',2);

-- Insert to Table beneficiary
insert into beneficiary values(1,'Senawirathnage Kasun Perera','Mr.','S.Kasun Perera','2000564798','Male','Married','1999-10-02','Brother','No 123/Anuradhapura/Kakirawa',0778462340,'yohan@gmail.com','sysIMG/BNF1',1,5);
insert into beneficiary values(2,'Gallage sewmi Nethmi','Miss.','G.sewmi Nethmi','2005698741','Female','Married','2001-10-10','Sister','N0 234/Embilipitiya',07014155475,'nethmikavee40@gmail.com','sysIMG/BNF2',2,6);


-- Insert to Table employee_type
insert into employee_type values(1,'Manager',200000);
insert into employee_type values(2,'Under Writter',80000);
insert into employee_type values(3,'Financial Officer',100000);


-- Insert to Table employee
insert into employee values('EMP1','Ranaginhage Lalinda Parageeth','Mr.','R.L.Perera','Male','Married','1975-10-08','197530801852','215,Gamage Waththa,Inimellagaha,Galle',0778542174,'lalinda76@gmail.com','EMP1',1,1);
insert into employee values('EMP2','Deweddanage Ranjani Mala','Miss.','D.R.Mala','Female','Married','1978-08-17','787951849v','212,Wilayaya,Galle',0171764565,'mranjani923@gmail.com','EMP2',2,2);


-- Insert to Table bank_details
insert into bank_details values(1,'1123456789','yohan','Kakirawa','RDB','PHID1');
insert into bank_details values(2,'1458976325','netmi','Embilipitiya','BOC','PHID2');

-- Insert to Table medical_details
insert into medical_details values(1,'PHID1',1,0,1,1,0,0,1,1,1,0);
insert into medical_details values(2,'PHID2',1,1,0,0,1,1,0,1,1,1);

-- Insert to Table premium
insert into premium values(1,1,'Online',null,5000,'January','2023-01-12');
insert into premium values(2,2,'Online',null,6000,'March','2023-03-03');


-- Insert to Table claim
insert into claim values('CLM1',1,'Accident By Vehcile','2022-03-04','Piliyandala','Asiri','Ward 1','Lost both legs from the vehicle accident',100000,'2022-03-06',0);
insert into claim values('CLM2',2,'Death from Injury','2022-06-06','Hospital','Nawaloka','Ward 2','Mother Died from cancer.',500000,'2022-06-08',0);


-- Insert to Table family_details
insert into family_details values(1,'Gamini Mudiyanse','1889786756','1889-02-10','Father','PHID1');
insert into family_details values(2,'Senarath Paranavithana','1992786756','1999-06-12','Father','PHID2');


-- Insert to Table additional_details
insert into additional_details values(1,'PHID1',170,50,1,1,1,1,1,0);
insert into additional_details values(2,'PHID2',160,60,1,0,1,0,1,1);


-- Insert to Table enquiry
insert into enquiry values(1,'PHID1','I didnt recieve my claim yet. why?','EMP2','Wait patiently. we will look into it soon.',1);
insert into enquiry values(2,'PHID2','I already have a policy. can i buy another one?','EMP2','Of course you can.',1);


-- Insert to Table feedback
insert into feedback values(1,'Having life insurance gave me peace of mind knowing that my family would be financially protected if something were to happen to me.',0,'PHID1');
insert into feedback values(2,'The claims process was dtraightforward and hassle-free. The insurance company paid out the death benefit promptly, which was a relief durnig a difficult time',0,'PHID2');


-- Insert to Table initial_payment
insert into initial_payment values(1,'Online',null,10000.0,'2023-07-08',1);
insert into initial_payment values(2,'Online',null,25000.0,'2022-08-10',2);