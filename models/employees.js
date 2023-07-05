const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    employeeID: {
        type: Number,
        // required: true,
        unique: true
    },
    employeeName: {
        type: String,
        // required: true
    },
    employeeStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    joiningDate: {
        type: Date,
        // required: true
    },
    birthDate: {
        type: Date,
        // required: true
    },
    skills: {
        type: [String],
        // required: true
    },
    salaryDetails: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
