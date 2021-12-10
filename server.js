const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

async function viewAllDepartments() {
    const [department] = await db.viewAllDepartments();
    console.table(department);
};

viewAllDepartments();