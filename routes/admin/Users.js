const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
//Model MemeUser
const {MemeUser} = require('../../model/memeUser')

const auth = require('../../middleware/auth')

router.get('/getAllUsers',auth,async(req,res)=>{
    const email = req.email.id;

    if(email == config.get('adminEmail')){

        try{    
            console.log('inside try')
            const allUsers = await MemeUser.find({});
            res.json(allUsers);
        }   catch(e){
            console.error(e.message)
            res.status(500).send('server error')
        }

    }
    else{
        res.json('invalid')
    }


})





router.get('/getSingleUser/:login',auth,async(req,res)=>{
    const email = req.email.id;
    try{    
        if(email == config.get('adminEmail')){
            const singleUser = await MemeUser.find({email:req.params.login});
            res.json(singleUser);
        }
        else{
            res.json('invalid')
        }
    }
    catch(e){
        console.log(e)
    }
})


router.get('/getSingleUserMemes/:login',auth,async(req,res)=>{
    const email = req.email.id;
    const userMemes = []
    try{    
        if(email == config.get('adminEmail')){
            const singleUser = await MemeUser.find({email:req.params.login},{
                user_memes:1
            });
            const one = singleUser.map((two)=>{
                return two.user_memes
            })

        
            res.json(one[0])
        }
        else{
            res.json('invalid')
        }
    }
    catch(e){
        console.log(e)
    }
})











module.exports = router