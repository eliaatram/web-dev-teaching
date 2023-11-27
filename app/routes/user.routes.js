const express = require('express')
const router = express.Router()

const user = require('../services/user.service')

router.get('/', user.getUser)

module.exports = router