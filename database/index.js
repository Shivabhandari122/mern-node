const mon = require('mongoose')


async function connectToDatabase(){
    await mon.connect(process.env.MONGODB_URI)
    console.log('database connected sucessfully')
}

module.exports = connectToDatabase