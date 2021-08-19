USE employees_db 
INSERT INTO department
    (name) 
    VALUES 
    ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role
        (title, salary, department_id)
        VALUES
        ('Sales Person', 50000, 1),
         ('Software Engineer', 100000, 2),
          ('Accountant', 200000, 3),
           ('Lawyer', 50000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
        VALUES
        ('Bob', 'Smith', 1, NULL),    
        ('John', 'Doe', 2, NULL), 
        ('David', 'Lopez', 3, NULL), 
        ('Johanna', 'Doe', 4, NULL);            