const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

// Menu option so users can select what action they want to perform
function mainMenu() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do next?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a New Department',
                'Add a New Role',
                'Add a New Employee',
                'Update an Employee',
                'Done'
            ]
        }
    ])
    // Switch statement after the user selects an option to take them to the right function
    .then(res => {
        switch(res.menu) {
            case 'View All Departments':
                return viewAllDepartments();    
            case 'View All Roles':
                return viewAllRoles();
            case 'View All Employees':
                return viewAllEmployees();
            case 'Add a New Department':
                return addDepartment();
            case 'Add a New Role':
                return addRole();
            case 'Add a New Employee':
                return addEmployee();
            case 'Update an Employee':
                return updateEmployee();
            case 'Done':
                return process.exit();
        }
    });
};

// Funtion to allow a user to view all departments
async function viewAllDepartments() {
    const [department] = await db.viewAllDepartments();
    console.table(department);
    // Return to Main Menu for more options
    mainMenu();
};

// Funtion to allow a user to view all roles
async function viewAllRoles() {
    const [roles] = await db.viewAllRoles();
    console.table(roles);
    // Return to Main Menu for more options
    mainMenu();
};

// Funtion to allow a user to view all employees
async function viewAllEmployees() {
    const [employees] = await db.viewAllEmployees();
    console.table(employees);
    // Return to Main Menu for more options
    mainMenu();
};


// Ability to add a new department to the departments table
async function addDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new department\'s name?'
        }
    ])
    db.addDepartment(department);
    console.log(`Added ${department} to your database.`);
    mainMenu();
};

// Ability to add a new role to the role table
async function addRole() {
    // Pull options so user can select a department to correspond with this role
    const [department] = await db.viewAllDepartments();
    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department is this role a part of?',
            choices: departmentChoices
        }
    ]);
    await db.addRole(role);
    console.log(`Added ${role.title} to the database`);
    mainMenu();
}

mainMenu();
