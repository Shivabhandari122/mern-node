const mon = require('mongoose')

async function connectToDatabase(){
    await mon.connect('mongodb+srv://qshiva906:whitehouse@cluster0.6ftcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('connected to the database sucessfully')
}

module.exports = connectToDatabase