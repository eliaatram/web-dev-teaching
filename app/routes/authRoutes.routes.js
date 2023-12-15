const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authentication.js');
const auth = require('../services/auth.service.js')

router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/signin', auth.signin)
router.get('/me', verifyToken, auth.getUser)
router.get('/logout', auth.logout)

module.exports = router