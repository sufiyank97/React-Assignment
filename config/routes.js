const express = require('express')
const router = express.Router()
const employeeController = require('../app/controllers/employeeController')

router.get('/employees', employeeController.list)
router.post('/employees', employeeController.create)
router.get('/download', employeeController.getJSON)
module.exports = router