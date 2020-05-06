const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nodejsTutorial',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})