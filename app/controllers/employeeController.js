const Employee = require('../models/employee')

module.exports.list = (req, res) => {
    Employee.find()
        .then(emp => {
            res.json(emp)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const employee = new Employee(body)
    employee.save()
        .then(employee => {
            res.json(employee)
        })
        .catch(err => {
            res.json(err)
        })
}