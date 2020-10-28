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
    else {
        res.json('invalid')
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
            const allUsers = await MemeUser.find({},{user_memes:1});
            const allMemes = [];
            // console.log(allUsers)
            res.json(allUsers[0].user_memes);
        
                }
                else{
                    res.json('invalid')
                }
            }
            catch(e){
                console.log(e)
            }
        })

                    

            
////////// block ||  unblock  || delete user ////////////////////////
////////// block ||  unblock  || delete user ////////////////////////
//Block user
router.get('/blockUser/:userID',(req,res)=>{
    MemeUser.findOneAndUpdate(
        {email:req.params.userID},
        { user_status: "block" },
        function(err, docs) {
          if (err) {
            res.status(500).send(err,'server error')
          } else {
                res.json(docs)
        }
        }
      );
})
//ublock user
router.get('/UnBlockUser/:userID',auth,(req,res)=>{
  
    MemeUser.findOneAndUpdate(
        {email:req.params.userID},
        { user_status: "unblock" },
        function(err, docs) {
          if (err) {
            res.status(500).send(err,'server error')
          } else {
                res.json(docs)
        }
        }
      );
})
//delete user
router.get('/deleteUser/:userID',auth,async(req,res)=>{
    try{
        const deletedUser = await  MemeUser.findOneAndDelete({email:req.params.userID})
        res.json(deletedUser)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})


////////// block and unblock  || delete user  ////////////////////////
////////// block and unblock  || delete user ////////////////////////






//get all meme star
//POST API
router.get('/userTag/:userTag',auth,async(req,res)=>{
    try{
        const getAllMemeStar = await  MemeUser.find({user_tag:req.params.userTag})
        res.json(getAllMemeStar)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})
//get all blocked users || unblocked users
//GET API
router.get('/userStatus/:userStatus',auth,async(req,res)=>{

    try{
        const users = await  MemeUser.find({user_status:req.params.userStatus})
        res.json(users)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})

//Make meme star  || noob || memestar 
//PUT API
router.put('/userTag',auth,async(req,res)=>{
    // get the meme star tag
    const userTag = req.body.userTag;
    const userEmail = req.body.userEmail;
    try{
        const filter = {email:userEmail}
        const update = {user_tag:userTag}
        const data = await MemeUser.findOneAndUpdate(filter, update);
        res.json(data)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})





//get all memes 
//GET API
router.get('/memes',async(req,res)=>{
    try{
        const memes = await  MemeUser.find({},{user_memes:1})
        const trial = memes[0];
        res.json(trial.user_memes)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})





////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Approved / Dissaproved Memes / delete ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

router.get('/approveMeme/:id',async(req,res)=>{
    
    try{
        const memes = await  MemeUser.update({
            "user_memes._id":req.params.id
        },{
            "$set":{
                "user_memes.$.meme_status":"approved"
            }
        })
        res.json(memes)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})


router.get('/DissApproveMeme/:id',async(req,res)=>{
    try{
        const memes = await  MemeUser.update({
            "user_memes._id":req.params.id
        },{
            "$set":{
                "user_memes.$.meme_status":"dissapproved"
            }
        })
        res.json(memes)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})


router.get('/DeleteMeme/:id',async(req,res)=>{
    try{
        const memes = await  MemeUser.update({
            "user_memes._id":req.params.id
        },{
            "$set":{
                "user_memes.$.meme_status":"dissapproved"
            }
        })
        res.json(memes)
    } catch(err){
        res.status(500).send(err,'server error')
    }
})



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Approved / Dissaproved Memes ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


//Set meme of the day
//POST api

router.post("/setMemeOfTheDay",async(req,res)=>{
    //get meme id
    const memeID = req.body.memeID;
    const data = await MemeUser.find({
        "user_memes._id":memeID
    })
    console.log(data)
    res.json(data)
})




    



module.exports = router;