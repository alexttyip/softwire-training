SELECT position as 'Position', AVG(salary) as 'Average Salary'
FROM employee
         JOIN job_position jp on employee.job_position_fk = jp.id
GROUP BY job_position_fk;

SELECT pp.provider
FROM employee_pension_provider as epp
         JOIN pension_provider pp on pp.id = epp.pension_provider_id_fk
GROUP BY pp.id;
