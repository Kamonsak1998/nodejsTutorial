const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Users = require('./models/users')

app.use(express.json())

app.use((res,req,next) => {
    console.log('Request >>',req)
    next()
})

mongoose.connect('mongodb://localhost:27017/devkung',{
    useNewUrlParser: true
})
mongoose.connection.on('error', err => {
    console.log('MongoDB error',err)
})

app.get('/',(req,res) => {
    res.end(
        `<h1>Hello World</h1>`
        )
})

app.get('/user',async(req,res) => {
    const users = await Users.find()
    res.json(users)
})

app.get('/user/:id',async(req,res) => {
    const { id } = req.params
    const user = await Users.findById(id)
    res.json(user)
})

app.post('/user/',async(req,res) => {
    const payload = req.body
    const users = new Users(payload)
    users.save()
    res.status(201).end()
})

app.put('/user/:id',async(req,res) => {
    const { id } = req.params
    const payload = req.body
    const users = await Users.findByIdAndUpdate(id,payload)
    res.status(200).end()
})

app.patch('/user/:id',async(req,res) => {
    const { id } = req.params
    const payload = req.body
    const users = await Users.findByIdAndUpdate(id,{$set: payload})
    res.status(200).end() 
})

app.delete('/user/:id',async(req,res) => {
    const { id }= req.params
    const user = await Users.findByIdAndDelete(id)
    res.status(204).end()
})

app.listen(8080)