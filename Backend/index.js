
const express=require('express')
const cors=require('cors')
const questions=require('./questions')
const bodyparser=require('body-parser')
const app=express()

app.use(cors())



app.use(express.urlencoded({ extended: true }));

app.use('/api',questions)

app.get('/',(req,res)=>{res.send('started')})
 

app.listen(5000,()=>{
    console.log('server started')
})


