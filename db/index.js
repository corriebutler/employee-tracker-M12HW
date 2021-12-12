const connection = require('./connection.js');

class DB {
    constructor(connection) {
        this.connection = (connection)
    }

    // SQL to pull the entire departments table
    viewAllDepartments() {
        return this.connection.promise().query( 
            `SELECT 
                department.id, 
                department.name
            FROM
                department`
        )
    };

    // SQL to pull the entire role table
    viewAllRoles() {
        return this.connection.promise().query( 
            `SELECT 
                role.id, 
                role.title,
                role.salary,
                department.name AS department
            FROM
                role
            LEFT JOIN 
                department ON role.department_id = department.id`
        )
    };

    // SQL to pull the entire employee table
    viewAllEmployees() {
        return this.connection.promise().query( 
            `SELECT 
                employee.id,
                employee.first_name,
                employee.last_name, 
                role.title AS role,
                employee.manager_id
            FROM
                employee
            LEFT JOIN 
                role ON employee.role_id = role.id`
        )
    };

    // SQL to add a new entry to the department table
    addDepartment(department) {
        return this.connection.promise().query(
            `INSERT INTO 
                department
            SET 
                ?`, department
        )
    };

    // SQL to add a new entry to the role table
    addRole(role) {
        return this.connection.promise().query(
            `INSERT INTO 
                role (title, salary, department_id)
            VALUES 
                (?)`, role
        )
    };

    // SQL to add a new entry to the employee table
    addEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO 
                employee (first_name, last_name, role_id, manager_id)
            VALUES 
                (?)`, employee
        )
    };

    // SQL to update an employee's Role
    updateEmployeeRole(newEmployee) {
        return this.connection.promise().query(
            `ALTER INTO 
                employee (role_id)
            VALUES 
                (?)`, newEmployee
        )
    }

};

module.exports = new DB(connection);