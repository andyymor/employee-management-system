const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { listenerCount } = require("events");
require("console.table");
init()


function init() {
viewEmployees()
};
function loadingPrompts() {
    prompt([{
        type: "list",
        name: "choice",
        mesasge: "What would you like to do?",
        choices: [
            {
                name: "view all employees",
                value: "VIEW_EMPLOYEES"
            },


            {
                name: "add employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "remove employee",
                value: "REMOVE_EMPLOYEE"
            },
            {
                name: "update employee role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },

            {
                name: "view all roles",
                value: "VIEW_ROLES"
            },
            {
                name: "add role",
                value: "ADD_ROLE"
            },
            {
                name: "view all departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "add department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "quit",
                value: "QUIT"
            }

        ]
    }]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "VIEW_ALL_ROLES":
                viewAllRoles();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "VIEW_ALL_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            default:
                quit();



        }
    })
};

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows
        console.log("\n");
        console.table(employees);
    })
    .then(()=> loadingPrompts());
}

function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What's employees first name?"
        },
        {
            name: "last_name",
            message: "What's employees last name?"
        }
    ])
    .then(res=>{
        let first_name = res.first_name
        let last_name = res.last_name
        db.findAllRoles()
        .then(([rows])=>{
            let roles = roles;
            const roleChoices = roles.map(({id, title})=>({
            name: title, 
            value: id
            }));
            prompt({
                type:"list",
                name:"roleId",
                messsge:"What's the employees role?",
                choices:roleChoices
            }) .then(res=>{
                let roleId = res.roleId;
                db.findAllEmployees()
                    .then(([rows])=>{
                        let employees = rows;
                        const managerChoices = employees.map(({id,first_name,last_name})=>({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));
                        managerChoices.unshift({name:'None',
                    value: null})
                    prompt({
                        type: "list",            
                        name: "managerId",
                        mesasge: "Who is this employees manager?",
                        choices: managerChoices
                     })
                     .then(res=>{
                         let employee = {
                             manager_id: res.managerId,
                             role_id: roleId,
                             first_name: first_name,
                             last_name: last_name
                         }
                         db.createEmployee(employee)
                     })
                     .then(()=> console.log(`added ${first_name} ${last_name} to db`))
                     .then(()=>loadingPrompts())
                  })
                
            })
        })
    })
}

function removeEmployee() {
db.findAllEmployees().then(([rows])=>{
    let employees = rows;
    const employeeChoices = employees.map(({id,first_name,last_name})=>({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee do you want to delete?",
            choices: employeeChoices
        }
    ])
    .then(res => db.removeEmployee(res.employeeId))
    .then(()=> console.log('removed employee'))
    .then(()=> loadingPrompts())
})
}