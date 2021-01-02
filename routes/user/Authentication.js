const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
// const auth = require('../../middleware/userAuth')


var { MemeData } = require("../../model/memeCollection");

var { MemeUser } = require("../../model/memeUser");

router.post("/registerGoogle", async (req, res) => {



    const date = new Date().toLocaleDateString();
    const username = req.body.username;
    const email = req.body.email;
    const user_avatar = req.body.userAvatar;

    //find user exist or not 
    const data = await MemeUser.find({ email });
  
    try{
      console.log('NEW LOGIN')

      console.log(email)  
  
      if (data.length <= 0) {
        var user = new MemeUser({
          username,
          email,
          user_avatar,
          joining_date: date
        });

        await user.save();
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
                // console.log('google sign token',token)
              })

  
      } else {

         const payload = {
                user:{
                    id:email
                }
            } 
            jwt.sign(payload, config.get('jwtSecret'),{        
                expiresIn:360000 
              }, (err,token)=>{
                 if(err) throw err;
                 console.log(token)
                 res.json(token);
                // console.log('google sign token',token)
              })
       }
    }
    catch (error) {
      res.status(500).send('Something broke!')
    }
  });







  module.exports = router;
