
const express = require('express')
const cors = require('cors')
const questions = require('./questions')
const mongoose = require('mongoose')
const userdb=require("./userdb")

const DB = "mongodb+srv://palak:Test123@cluster0.xieg8.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => { console.log(err) })
const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api', questions)
app.use('/api/Userdb',userdb)

app.listen(5000, () => {
    console.log('server started')
})


