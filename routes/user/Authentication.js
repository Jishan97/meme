const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
// const auth = require('../../middleware/userAuth')


var { MemeData } = require("../../model/memeCollection");

var { MemeUser } = require("../../model/memeUser");

router.post("/registerGoogle", async (req, res) => {
  console.log('NEW LOGIN')
    const date = new Date().toLocaleDateString();
    const username = req.body.username;
    const email = req.body.email;
    const user_avatar = req.body.userAvatar;

    //find user exist or not
    const data = await MemeUser.find({ email });
  
    try{

      console.log('NEW LOGIN')
  
      if (data.length <= 0) {
        var user = new MemeUser({
          username,
          email,
          user_avatar,
          joining_date: date
        });
    
            const payload = {
                user:{
                    id:email
                }
            } 
            jwt.sign(payload, config.get('jwtSecret'),{        
                expiresIn:360000 
              }, (err,token)=>{
                 if(err) throw err;
                //  res.json({token});
                console.log('google sign token',token)
              })

        user.save().then(result => {
          console.log(result);
          res.json("done");
        });
      } else {
      res.json({msg:'already exits'})  
       }
    }
    catch (error) {
      res.status(500).send('Something broke!')
    }
  });


  module.exports = router;
