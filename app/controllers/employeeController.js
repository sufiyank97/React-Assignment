const Employee = require('../models/employee')
const request = require('request')
const fs = require('fs')
const path = require("path");

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

module.exports.getJSON = (req, res1) => {
    console.log(req.socket.localPort)
    const port = req.socket.localPort
    const fileLocation = path.resolve(__dirname, "../../", "input.json")
    console.log(fileLocation)
    const writer = fs.createWriteStream(fileLocation)
    request({
        uri: "http://localhost:" + port + "/employees",
        method: 'GET'
    }, (err, res, body) => {
        const data = JSON.parse(body)
        var data1 = []
        data.forEach(function (item) {
            var tempItem = Object.assign({}, item);
            tempItem.Contact.map(c1 => {
                delete c1._id
            })
            delete tempItem._id;
            delete tempItem.__v;
            data1.push(tempItem);
        });
        console.log(data1)
        fs.writeFile("input.json", JSON.stringify(data1), (err) => {
            if (err) throw err
            console.log('complete')
        })
        res1.download(__dirname, "input.json")
        // console.log(res1.download())
    })

}