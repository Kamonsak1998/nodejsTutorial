const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 3000,
    authRouter = require('./routes/auth'),
    userRouter = require('./routes/user')

// Connect to database And Use passport
require('./config/db')
require('./config/passport')

// Set Parses JSON
app.use(express.json())

// Error Handler
app.use((err,req,res,next) => {
    let statusCode = err.status || 500
    res.status(statusCode)
    res.json({
        error:{
            status: statusCode,
            messages: err.messages
        }
    })
})

//router
app.use('/auth',authRouter)
app.use('/user',passport.authenticate('jwt',{session:false}),userRouter)

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`))