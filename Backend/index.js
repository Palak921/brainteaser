
const express=require('express')
const cors=require('cors')
const questions=require('./questions')
const mongoose=require('mongoose')

const DB="mongodb+srv://quizapp:q43MD5MdJaUQFKX@cluster0.sfd0r.mongodb.net/Gamedeatails"




mongoose.connect(DB,{ useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,}).then(()=>{
        console.log('Db connectde')
    }).catch(err=>{console.log(err)})
const app=express()

app.use(cors())



app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api',questions)

app.get('/',(req,res)=>{res.send('started')})
 

app.listen(5000,()=>{
    console.log('server started')
})


