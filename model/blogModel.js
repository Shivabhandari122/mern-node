const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: string
    },
    image: {
        type: string
    }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog