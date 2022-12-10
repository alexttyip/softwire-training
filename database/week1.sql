DROP DATABASE employment;

CREATE DATABASE employment;

USE employment;

CREATE TABLE job_position
(
    id       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(255) NOT NULL
);

CREATE TABLE employee
(
    employee_number INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    age             INT          NOT NULL,
    salary          FLOAT        NOT NULL,
    job_position_fk INT          NOT NULL,
    FOREIGN KEY (job_position_fk) REFERENCES job_position (id)
);

CREATE TABLE pension_provider
(
    id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    provider   VARCHAR(255) NOT NULL,
    is_default BOOL         NOT NULL
);

CREATE TABLE employee_pension_provider
(
    employee_number_fk     INT   NOT NULL,
    pension_provider_id_fk INT   NOT NULL,
    contribution           FLOAT NULL DEFAULT 0,
    FOREIGN KEY (employee_number_fk) REFERENCES employee (employee_number),
    FOREIGN KEY (pension_provider_id_fk) REFERENCES pension_provider (id)
);

INSERT INTO job_position (position)
VALUES ('Junior software developer'),
       ('Senior software developer'),
       ('Tech lead'),
       ('Project manager');

INSERT INTO pension_provider (provider, is_default)
VALUES ('Aegon', true),
       ('iPension', false),
       ('myPension', false);

INSERT INTO employee (first_name, last_name, age, salary, job_position_fk)
VALUES ('Ruby', 'Lav', 10, 10, 4),
       ('Saoirse', 'Bry', 20, 100, 3),
       ('Alex', 'Yip', 30, 200, 1);

INSERT INTO employee_pension_provider (employee_number_fk, pension_provider_id_fk, contribution)
VALUES (1, 2, 10),
       (2, 3, 15),
       (3, 1, 20);

SELECT CONCAT(first_name, ' ', last_name) as name
FROM employee
WHERE age > 15;

UPDATE employee_pension_provider AS dest, (SELECT employee_number, salary FROM employee) as src
SET dest.contribution = dest.contribution + src.salary * 0.05
WHERE dest.employee_number_fk = src.employee_number;
