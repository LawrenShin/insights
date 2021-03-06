--Code for country_ table

DROP TABLE IF EXISTS country CASCADE;

CREATE TABLE IF NOT EXISTS country
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(45) NOT NULL,
	code VARCHAR(3) NOT NULL,
	di_score FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for address table: 

DROP TABLE IF EXISTS address CASCADE;

CREATE TABLE IF NOT EXISTS address 
(
	id SERIAL PRIMARY KEY,
	address_line VARCHAR(650) NOT NULL,
	address_number VARCHAR(100) NULL DEFAULT NULL,
	country_id INT REFERENCES country(id),
	city VARCHAR(100) NOT NULL,
	postal_code VARCHAR(70) NULL DEFAULT NULL,
	region VARCHAR(10) NULL DEFAULT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX address_id_pk
    ON public.address USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

ALTER TABLE public.address
    CLUSTER ON address_id_pk;


--Code for country Demographics table

DROP TABLE IF EXISTS country_demographics;

CREATE TABLE IF NOT EXISTS country_demographics
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	population FLOAT NOT NULL,
	immigrant_pop FLOAT NOT NULL,
	immigrant_percent FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country_Economy table

DROP TABLE IF EXISTS country_economy;

CREATE TABLE IF NOT EXISTS country_economy
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	gdp DOUBLE PRECISION NOT NULL,
	gdp_per_capita DOUBLE PRECISION NOT NULL,
	labour_force DOUBLE PRECISION NOT NULL,
	gdp_world FLOAT NOT NULL,
	labour_force_percent FLOAT NOT NULL,
	male_unemploy FLOAT NOT NULL,
	female_unemploy FLOAT NOT NULL,
	avg_income FLOAT NOT NULL,
	poor FLOAT NOT NULL,
	equality_level FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country Gender table

DROP TABLE IF EXISTS country_gender;

CREATE TABLE IF NOT EXISTS country_gender
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	male_pop FLOAT NOT NULL,
	female_pop FLOAT NOT NULL,
	women_edu FLOAT NOT NULL,
	female_work_force FLOAT NOT NULL,
	female_work_force_percent FLOAT NOT NULL,
	female_work_force_percent_pop FLOAT NOT NULL,
	materinty_leave FLOAT NOT NULL,
	paternity_leave FLOAT NOT NULL,
	gender_work_gap FLOAT NOT NULL,
	gender_health_gap FLOAT NOT NULL,
	gender_edu_gap FLOAT NOT NULL,
	gender_pol_gap FLOAT NOT NULL,
	income_gap FLOAT NOT NULL,
	women_violence FLOAT NOT NULL,
	female_parliament_share FLOAT NOT NULL,
	female_minister_share FLOAT NOT NULL,
	female_promotion_policy FLOAT NOT NULL,
	life_male FLOAT NOT NULL,
	life_female FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country_Age table


DROP TABLE IF EXISTS country_age;

CREATE TABLE IF NOT EXISTS country_age
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	dis19 FLOAT NOT NULL,
	dis39 FLOAT NOT NULL,
	dis59 FLOAT NOT NULL,
	dis70 FLOAT NOT NULL,
	disx FLOAT NOT NULL,
	avg18 FLOAT NOT NULL,
	parliament FLOAT NOT NULL,
	ministers FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country_Religion table

DROP TABLE IF EXISTS country_religion;

CREATE TABLE IF NOT EXISTS country_religion 
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	muslim FLOAT NOT NULL,
	christian FLOAT NOT NULL,
	hindu FLOAT NOT NULL,
	buddishm FLOAT NOT NULL,
	judaism FLOAT NOT NULL,
	other FLOAT NOT NULL,
	statereligion FLOAT NOT NULL,
	freedom FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country Edu table

DROP TABLE IF EXISTS country_edu;

CREATE TABLE IF NOT EXISTS country_edu 
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	elementary_mf FLOAT NOT NULL,
	elementary_male FLOAT NOT NULL,
	elementary_female FLOAT NOT NULL,
	high_school_mf FLOAT NOT NULL,
	high_school_male FLOAT NOT NULL,
	high_school_female FLOAT NOT NULL,
	bachelor_mf FLOAT NOT NULL,
	bachelor_male FLOAT NOT NULL,
	bachelor_female FLOAT NOT NULL,
	master_mf FLOAT NOT NULL,
	master_male FLOAT NOT NULL,
	master_female FLOAT NOT NULL,
	total_mf FLOAT NOT NULL,
	expected_education FLOAT NOT NULL,
	actual_education FLOAT NOT NULL,
	public_funding_gdp FLOAT NOT NULL,
	public_fund_fund FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country Race table

DROP TABLE IF EXISTS country_race;

CREATE TABLE IF NOT EXISTS country_race 
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	black FLOAT NOT NULL,
	asian FLOAT NOT NULL,
	hispanic FLOAT NOT NULL,
	arab FLOAT NOT NULL,
	caucasian FLOAT NOT NULL,
	indegineous FLOAT NOT NULL,
	discrimination_law FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country_Sex table

DROP TABLE IF EXISTS country_sex;

CREATE TABLE IF NOT EXISTS country_sex
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	same_marriage FLOAT NOT NULL,
	homosexual_tolerance FLOAT NOT NULL,
	homosexual_pop FLOAT NOT NULL,
	same_adopt FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


--Code for country_disability table

DROP TABLE IF EXISTS country_disability;

CREATE TABLE IF NOT EXISTS country_disability
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	disabled FLOAT NOT NULL,
	discrimination_law FLOAT NOT NULL,
	overweight FLOAT NOT NULL,
	health_funding_gdp FLOAT NOT NULL,
	health_funding_type FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country_Urban table

DROP TABLE IF EXISTS country_urban;

CREATE TABLE IF NOT EXISTS country_urban 
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	cities_pop FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for country Political table

DROP TABLE IF EXISTS country_political;

CREATE TABLE IF NOT EXISTS country_political
(
	id SERIAL PRIMARY KEY,
	country_id INT REFERENCES country(id),
	democracy FLOAT NOT NULL,
	corruption FLOAT NOT NULL,
	freedom_speech FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for Company table

DROP TABLE IF EXISTS company CASCADE;

CREATE TABLE IF NOT EXISTS company
(
	id SERIAL PRIMARY KEY,
	lei CHAR(20) NULL DEFAULT NULL,
	legal_name VARCHAR(400) NULL DEFAULT NULL,
	legal_jurisdiction VARCHAR(6) DEFAULT NULL,
	status VARCHAR(30) DEFAULT NULL,
	num_employees INT NULL DEFAULT NULL,
	di_policy BOOL NULL DEFAULT NULL,
	di_position BOOL NULL DEFAULT NULL,
	di_exec_team BOOL NULL DEFAULT NULL,
	di_supply_chain_policy BOOL NULL DEFAULT NULL,
	legal_id INT REFERENCES address(id) ,
	hq_id INT REFERENCES address(id),
	effective_from TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX company_id_pk
    ON public.company USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

ALTER TABLE public.company
    CLUSTER ON company_id_pk;
	
CREATE INDEX company_lei_idx
    ON public.company USING hash
    (lei COLLATE pg_catalog."default")
    TABLESPACE pg_default;

--Code for Company Name table

DROP TABLE IF EXISTS company_name CASCADE;

CREATE TABLE IF NOT EXISTS company_name
(
	id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	name VARCHAR(400) NOT NULL,
	effective_from TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX company_name_id_pk
    ON public.company_name USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

ALTER TABLE public.company_name
    CLUSTER ON company_name_id_pk;
	
CREATE INDEX company_name_company_id_idx
    ON public.company_name USING btree
    (company_id ASC NULLS LAST)
    TABLESPACE pg_default;
	
--Code for Company Operation table
DROP TABLE IF EXISTS company_operation CASCADE;

CREATE TABLE IF NOT EXISTS company_operation
(
	id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	country_id INT REFERENCES country(id),
	ticker VARCHAR(10) NOT NULL,
	is_primary BOOLEAN NOT NULL,
	effective_from TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX company_operation_id_pk
    ON public.company_operation USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

ALTER TABLE public.company_operation
    CLUSTER ON company_operation_id_pk;
	
CREATE INDEX company_operation_company_id_idx
    ON public.company_operation USING btree
    (company_id ASC NULLS LAST)
    TABLESPACE pg_default;
	
--Code for country Company table

DROP TABLE IF EXISTS company_country;

CREATE TABLE IF NOT EXISTS company_country
(
	company_country_id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	country_id INT REFERENCES country(id),
	company_country_legal_operation VARCHAR(9) NULL DEFAULT NULL,
	company_country_effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for Industry table

DROP TABLE IF EXISTS industry CASCADE;

CREATE TABLE IF NOT EXISTS industry
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for Company Industry table

DROP TABLE IF EXISTS company_industry;

CREATE TABLE IF NOT EXISTS company_industry
(
	id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	industry_id INT REFERENCES industry(id),
	primary_secondary CHAR(1) NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for industry country table

DROP TABLE IF EXISTS industry_country;

CREATE TABLE IF NOT EXISTS industry_country
(	id SERIAL PRIMARY KEY,
	industry_id INT REFERENCES industry(id),
	country_id INT REFERENCES country(id),
	num_employees INT NOT NULL,
	avg_pay FLOAT NOT NULL,
	rentention_rate FLOAT NOT NULL,
	education_spend FLOAT NOT NULL,
	flexible_hours_pledge FLOAT NOT NULL,
	di_pledge FLOAT NOT NULL,
	harassment_pledge FLOAT NOT NULL,
	industry_diversity FLOAT NOT NULL,
	women_employeed_percent FLOAT NOT NULL,
	materinty_leave_pledge FLOAT NOT NULL,
	paternity_leave_pledge FLOAT NOT NULL,
	lgbt_pledge FLOAT NOT NULL,
	disabilities_pledge FLOAT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for Person table

DROP TABLE IF EXISTS person CASCADE;

CREATE TABLE IF NOT EXISTS person
(
	id SERIAL PRIMARY KEY,
	address INT REFERENCES address(id),
	nation INT REFERENCES country(id),
	name VARCHAR(135) NOT NULL,
	birth_year VARCHAR(45) NULL DEFAULT NULL,
	gender VARCHAR(45) NULL DEFAULT NULL,
	picture VARCHAR(45) NULL DEFAULT NULL,
	race VARCHAR(45) NULL DEFAULT NULL,
	religion VARCHAR(45) NULL DEFAULT NULL,
	married VARCHAR(45) NULL DEFAULT NULL,
	high_edu VARCHAR(45) NULL DEFAULT NULL,
	edu_subject VARCHAR(100) NULL DEFAULT NULL,
	edu_institute VARCHAR(100) NULL DEFAULT NULL,
	sexuality VARCHAR(45) NULL DEFAULT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for ratings table

DROP TABLE IF EXISTS ratings;

CREATE TABLE IF NOT EXISTS ratings
(
	id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	rating_type CHAR(5) NOT NULL,
	rating_value INT NOT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Code for role table

DROP TABLE IF EXISTS role;

CREATE TABLE IF NOT EXISTS role
(
	id SERIAL PRIMARY KEY,
	company_id INT REFERENCES company(id),
	person_id INT REFERENCES person(id),
	is_effective SMALLINT NULL DEFAULT NULL,
	role_type CHAR(15) NOT NULL,
	title VARCHAR(200) NOT NULL,
	base_salary INT NULL DEFAULT NULL,
	incentive_options VARCHAR(45) NULL DEFAULT NULL,
	effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
