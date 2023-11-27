const express = require('express')
const router = express.Router()

const tests = require('../services/tests.service')

router.get('/', tests.getTest)
router.post('/add', tests.addTest)

module.exports = router