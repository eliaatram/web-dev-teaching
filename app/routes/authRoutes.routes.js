const express = require('express')
const router = express.Router()

const auth = require('../services/auth.service.js')

router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/me', auth.getUser)
router.get('/logout', auth.logout)

module.exports = router