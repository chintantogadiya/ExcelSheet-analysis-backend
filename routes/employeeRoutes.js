const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');

router.get("/getAllEmployees", async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.json(employees)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured!")
    }
})

// Add Employee
router.post('/addEmployee', async (req, res) => {
    try {
        const {
            employeeID,
            employeeName,
            employeeStatus,
            joiningDate,
            birthDate,
            skills,
            salaryDetails,
            address,
        } = req.body;

        const employee = new Employee({
            employeeID,
            employeeName,
            employeeStatus,
            joiningDate,
            birthDate,
            skills,
            salaryDetails,
            address,
        });

        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// Delete Employee
router.delete("/deleteEmployee/:id", (req, res) => {
    const employeeId = req.params.id;
    // Find the employee by ID and delete it
    Employee.deleteOne({ employeeID: employeeId })
        .then((deletedEmployee) => {
            if (!deletedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json({ message: 'Employee deleted successfully' });
        })
        .catch((error) => {
            console.log('Error deleting employee:', error);
            res.status(500).json({ message: 'An error occurred while deleting the employee' });
        });
})
module.exports = router;