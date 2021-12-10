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
                'View All Roles'
            ]
        }
    ])
    .then(res => {
        switch(res.menu) {
            case 'View All Departments':
                return viewAllDepartments();    
            case 'View All Roles':
                return viewAllRoles();
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

mainMenu();
