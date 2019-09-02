class Employee
{
    constructor(firstName, lastName, hireDate, role, quote) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.hireDate = hireDate;
        this.employeeId = null;
        this.quote = quote;
        this.joke = null;
    }
}
module.exports = Employee;