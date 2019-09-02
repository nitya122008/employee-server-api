var express = require('express');
var router = express.Router();
var Request = require('request');
var EmployeeService = require('../services/employee.service');

/* GET employees listing. */
router.get('/', function(req, res, next) {
  const employees =  EmployeeService.fetchEmployees();
  res.status(201).json({employees: employees});
});

router.post('/', async(req, res, next) => {
  const data = req.body;
  try {
    const employee = await EmployeeService.createEmployee(data);
    if(data.guid != null) {
      employee.guid = data.guid;
    }

    res.cookie('guid', employee.guid, {maxAge: 900000, httpOnly: true});
    return res.status(201).json({employee : employee});
    
  } catch (err) {
      if(err.name === 'ValidationError')
      {
        return res.status(400).json({error : err.message});
      }

      return next(err);
  }
  

})

router.get('/:id', async (req, res, next) =>
{
	try
	{
		const employee = await EmployeeService.retrieveEmployee(req.params.id);

		return res.json({ employee: employee });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the employee by empId */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const employee = await EmployeeService.updateEmployee(req.params.id, req.body);

		return res.json({ employee: employee });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the employee from the employee list by emp id */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const employee = await EmployeeService.deleteEmployee(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});


module.exports = router;
