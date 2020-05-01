const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/nodejsTutorial',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})