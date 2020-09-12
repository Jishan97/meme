const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth')

var { MemeData } = require("../../model/memeCollection");

var { MemeUser } = require("../../model/memeUser");



router.post('/',(req,res)=>{

    let Cemail = config.get("adminEmail")
    let Cpassword = config.get("adminPassword")

    const {email,password} = req.body;

    if(Cemail == email && Cpassword == password){
        const payload = {
            user:{
                id:email
            }
        } 
        jwt.sign(payload, config.get('jwtSecret'),{        
            expiresIn:360000 
          }, (err,token)=>{
             if(err) throw err;
             res.json({token});
          })
    }



})
 



router.get('/',auth,(req,res)=>{
    const email = req.email.id;
    try{
        if(email == config.get('adminEmail')){
            res.json(email)
        }
        else{
            res.json('invalid')
        }
    }
    catch(e){
        console.log(e)
    }
})

// Get all memes

router.get('/getAllMemes',auth,async(req,res)=>{
    const email = req.email.id;
    try{
        if(email == config.get('adminEmail')){
            const allUsers = await MemeUser.find({});
            const allMemes = [];
            allUsers.map((one)=>{
                allMemes.push(one.user_memes)
            })

            res.json(allMemes[0]);
        }
        else{
            res.json('invalid')
        }
    }
    catch(e){
        console.log(e)
    }
})

router.get('/getAllUsers',auth,async(req,res)=>{
    const email = req.email.id;
    try{
        if(email == config.get('adminEmail')){
            const allUsers = await MemeUser.find({});

            res.json(allUsers);
        }
        else{
            res.json('invalid')
        }
    }
    catch(e){
        console.log(e)
    }
})





module.exports = router;