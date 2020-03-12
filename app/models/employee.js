const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const empSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    Contact: [{
        type: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    }],
    skills: [
        String
    ],
    dob: {
        type: String
    }
})

const Employee = mongoose.model('Employee', empSchema)
module.exports = Employee