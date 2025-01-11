require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
const {multer, storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs')

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

    app.post('/blog',upload.single('image'), async(req, res) =>{
    //console.log(req.body) //fetch data from frontend to the backend but not put in database using api
    const {title, subtitle, description} = req.body
    const filename = req.file.filename
    console.log(req.file)

    if(!title || !subtitle || !description){
        return res.status(400).json({
            message: "please provide title, subtitle and description"
        })
    }
    await Blog.create({
        title : title,
        subtitle: subtitle,
        description: description,
        image: filename
    })


    // const {title, subtitle, description, image} = req.body  // it mean that from res.body data should be put in respective variable
    // if(!title || !subtitle || !description || !image){
    //     return res.status(400).json({
    //         message: "please provide title, subtitle, description and image"
    //     })
    // }
    // await Blog.create({
    //     title: title,
    //     subtitle: subtitle,
    //     description: description,
    //     image: image
    // }) */

    res.status(201).json({
        message: "my Api run"
    })
})
app.get('/blog', async(req, res) =>{
    const blogs = await Blog.find() //table ma bhako sabai data fetch garcha find method la
    res.status(200).json({
        message: "Blog fetched successfully",
        data : blogs
    })
})
app.use(express.static('./storage'))

//single blog fetched

app.get('/blog/:id', async(req, res) =>{
    const id = req.params.id
    const blog = await Blog.findById(id)

    if(!blog){
        res.status(400).json({
            message: "data not found"
        })
    }else{
        res.status(200).json({
            message: "data fetched sucessfully",
            data : blog
        })
    }

})

//delete blog

app.delete('/blog/:id', async(req, res) =>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image

    fs.unlink(`storage/${imageName}`, (err) =>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted successfully")
        }
    })

    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "Delete blog successfully"
    })
})
// update book data

app.patch('/blog/:id',upload.single('image'), async(req, res) =>{
    const id = req.params.id
    const {title, subtitle, description} = req.body
    let imageName;

    //update with image
    if(req.file){
        imageName = req.file.filename
        const blog = await Blog.findById(id)
        const oldImageName = blog.image

        fs.unlink(`storage/${oldImageName}`, (err) =>{
            if(err){
                console.log(err)
            }else{
                console.log("file deleted successfully")
            }
        })
    }


    //just data update not image
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle: subtitle,
        description: description,
    })
    res.status(200).json({
        message: "blog updated succesfully"
    })
})


//process.env.PORT
