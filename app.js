require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const app = express()

app.use(express.json())

connectToDatabase()

app.listen(process.env.PORT, ()=>{
    console.log("nodejs project has been started")
})

app.get('/', (req, res) =>{
    //res.send("hello world")
    res.json({
        message: "This is home page"
     })
})

app.post('/blog', (req, res) =>{
    console.log(req.body)
    res.status(201).json({
        message: "my Api run"
    })
})

//process.env.PORT
