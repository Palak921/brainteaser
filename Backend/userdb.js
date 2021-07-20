const express = require('express')
const router = express.Router()
const UserDetails=require('./userDetails')

router.post('/signup',async(req,res)=>{
    const {username,password}=req.body
    const olduser=await UserDetails.findOne({username,password});
    if(olduser){
        res.send('Already Exists')
    }
    else{
    const newuser = new UserDetails({username,password,score:0,level:'easy',ques:0 });
     newuser.save((err)=>{
         if(err){
             res.status(404).send({err})
         }
         else{
             res.status(200).send(newuser)
         }
     })
    }
})

router.post('/signin',async(req,res)=>{
    const {username,password}=req.body 
    try{
        const olduser=await UserDetails.findOne({username,password});
        if(olduser){
        res.status(200).send(olduser)
        }
        else{
            res.send('No data found')
        }
    }
    catch(error){
        res.status(404).send(error)
    }

})
router.post('/userGameDetails',async(req,res)=>{
    const {level,ques,score,username,password}=req.body
    try{
        const user=await UserDetails.findOneAndUpdate({username,password},{level,ques,score},{new:true,useFindAndModify:false});
        res.status(200).send(user)
    }
    catch(error){
        res.send(error).status(404)
    }
})


router.post('/fetchUserDetails',async(req,res)=>{
    const {username,password}=req.body
    try{
        const user=await UserDetails.findOne({username,password});
        res.status(200).send(user)
    }
    catch(error){
        res.send(error).status(404)
    }
    })
module.exports = router