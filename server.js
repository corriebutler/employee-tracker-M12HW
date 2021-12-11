const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

function mainMenu() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do next?',
            choices: [
                'View All Departments',
                'View All Roles',
                'Add a Department'
            ]
        }
    ])
    .then(res => {
        switch(res.menu) {
            case 'View All Departments':
                return viewAllDepartments();    
            case 'View All Roles':
                return viewAllRoles();
            case 'Add a Department':
                return addDepartment();
        }
    });
};

async function viewAllDepartments() {
    const [department] = await db.viewAllDepartments();
    console.table(department);
    mainMenu();
};

async function viewAllRoles() {
    const [roles] = await db.viewAllRoles();
    console.table(roles);
    mainMenu();
};

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

mainMenu();
