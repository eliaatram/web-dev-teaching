const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const cors = require('cors')
const PORT = 4500

try {
    mongoose.connect('mongodb://127.0.0.1:27018/epita', {
        authSource: "admin",
        user: "root",
        pass: "example",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connected to database')
} catch (error) {
    console.log('Error connecting to db' + error)
}

// ROUTES
const todosRouter = require('./routes/todos.routes')
const testRouter = require('./routes/test.routes')
const messageRouter = require('./routes/messages.routes')
const authRouter = require('./routes/authRoutes.routes')
const userRouter = require('./routes/user.routes')

app.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// Adding routes
app.use('/todo', todosRouter)
app.use('/test', testRouter)
app.use('/message', messageRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log('Server running on http://127.0.0.1:' + PORT)
})