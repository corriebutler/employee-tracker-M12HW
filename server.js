const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

async function viewAllDepartments() {
    const [department] = await db.viewAllDepartments();
    console.table(department);
};

async function viewAllRoles() {
    const [roles] = await db.viewAllRoles();
    console.table(roles);
};

