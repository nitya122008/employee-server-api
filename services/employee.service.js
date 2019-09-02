const Employee = require('../model/employee')
let Validator = require('fastest-validator');
let moment = require('moment');
let employees = {};
let empCount = 0;
let empValidator = new Validator();
const EMPLOYEE_ROLES = ['LACKEY','CEO','VP','MANAGER'];

let namePattern = /([A-z\-\'])*/;
let schema = {
    firstName : {type: "string", min:2, max:25, pattern: namePattern},
    lastName : {type: "string", min:2, max:25, pattern: namePattern},
    hireDate : {type : "date", convert:true}
}

class EmployeeService
{
    static validateEmployee(emp) {
        let errors = {};
        var valResp = empValidator.validate(emp, schema);
        var hireDate = moment(emp.hireDate, 'YYYY-MM-DD', true);
        var isValidHireDate = (hireDate.isValid() && hireDate.isBefore(moment()));
        var isValidRole = EMPLOYEE_ROLES.includes(emp.role);
        if(!isValidHireDate) {
            console.log('Hire Date is invalid');
            errors['hireDate'] = 'Invalid Hire Date';
        }

        if(!isValidRole) {
            console.log('Role is invalid');
            errors['role'] = 'Invalid Role';
        }

        if(!valResp) {
            let element;
            for(const idx in valResp) {
                element = valResp[idx];
                console.log(element.field);
                console.log(element.message);
                errors[element.field] = element.message;
            }
        }
        return errors;
    }

    static createEmployee(emp) {
        
        let errors = {};
        let quote = '';
        errors = this.validateEmployee(emp);
        //Throw errors only if the errors object is not empty
        if(errors && Object.keys(errors).length !== 0) {
            console.log('there are validation errors');
            throw {
                name : "ValidationErrors",
                message : "errors"
            }
        }
        
        
        let newEmp = new Employee(emp.firstName, emp.lastName, emp.hireDate, emp.role, emp.quote);
        newEmp.employeeId = 'EMP' + empCount++;
        
        employees[newEmp.employeeId] = newEmp;
        return newEmp;
        
    }

    static fetchEmployees() {
        return employees;
    }

    static retrieveEmployee(employeeId)
	{
		if(employees[employeeId] != null)
		{
			return employees[employeeId];
		}
		else
		{
			throw new Error('Unable to retrieve an employee by (empl id:'+ employeeId +')');
		}
    }
    
    static updateEmployee(employeeId, data)
	{
		if(employees[employeeId] != null)
		{
            let errors = {};
            errors = this.validateEmployee(data);
            //Throw errors only if the errors object is not empty
            if(errors && Object.keys(errors).length !== 0) {
                console.log('there are validation errors');
                throw {
                    name : "ValidationErrors",
                    message : "errors"
                }
            }

			const employee = employees[employeeId];
			
            Object.assign(employee, data);
            return employee;
		}
		else
		{
			throw new Error('Unable to retrieve an employee by (emp id:'+ employeeId +')');
		}
	}

	static deleteEmployee(employeeId)
	{
		if(employees[employeeId] != null)
		{
			delete employees[employeeId];
		}
		else
		{
			throw new Error('Unable to retrieve an employee by (emp id:'+ employeeId +')');
		}
	}

}
module.exports = EmployeeService;
 