const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const xlsx = require('xlsx');

// Route for handling file upload
function convertExcelToJson(filePath) {
    // Load the workbook from the file
    const workbook = xlsx.readFile(filePath);

    // Choose the worksheet to read from (e.g., the first sheet)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet to JSON data
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    return jsonData;
}

const upload = require('../middleware/fileUpload');

router.post('/upload', upload.array("csvFile"), async(req,res) => {
    try {
        const jsonFiles = [];

        req.files.forEach((file) => {
            const jsonData = convertExcelToJson(file.path);
            jsonFiles.push(jsonData);
        });
        // Flatten the array of arrays to get a single array of employee objects
        const employees = jsonFiles.flat();

        // Modify each employee object to convert joiningDate and birthDate to Date objects
        employees.forEach((employee) => {
            employee.joiningDate = new Date(employee.joiningDate);
            employee.birthDate = new Date(employee.birthDate);
            employee.address = String(employee.address); // Convert address to a string explicitly
        });
        // Save the data to MongoDB
        await Employee.insertMany(employees);
        res.json({ message: 'Data imported successfully.' });
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error importing data.' });
    }
})

module.exports = router;