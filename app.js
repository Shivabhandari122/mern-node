const express = require('express')
const connectToDatabase = require('./database')
const app = express()

connectToDatabase()

app.listen(3000, ()=>{
    console.log("nodejs project has been started")
})

app.get('/about', (req, res) =>{
    //res.send("hello world")
    res.json({
        message: "This is home page"
     })
})
