const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

//Model MemeUser
const { MemeUser } = require("../../model/memeUser");

const auth = require("../../middleware/auth");


//API || GET || GET ALL MEMES 
router.get("/getAllMemes", auth, async (req, res) => {
    const email = req.email.id;

    const checkEmail = MemeUser.find({ email });

    if (checkEmail) {
        try {
            const allMemes = MemeUser.find({}, { user_memes: 1 });
            console.log("MEMES", allMemes);
            res.json(allMemes[0].user_memes);
        } catch (e) {
            res.sendStatus(404, "Error while finding memes");
        }
    } else {
        res.sendStatus(404, "Email not found");
    }
});

//API || GET || GET ALL MEME TAG || MEME UPLOAD FORM
router.get("/getMemeTag", auth, async (req, res) => {
    const email = req.email.id;

    const checkEmail = MemeUser.find({ email });

    if (checkEmail) {
        try {
            const data = await adminControl.find({}, { meme_tags: 1 });
            res.json(data[0]);
        } catch (e) {
            res.sendStatus(404, "Error while finding memes tags");
        }
    } else {
        res.sendStatus(404, "Email not found");
    }
});

//API || GET || GET ALL TRENDING TOPICS || MEME UPLOAD FORM
router.get("/getTrendingTopics", auth, async (req, res) => {
    const email = req.email.id;

    const checkEmail = MemeUser.find({ email });

    if (checkEmail) {
        try {
            const data = await adminControl.find({}, { meme_trending_topics: 1 });
            res.json(data[0]);
        } catch (e) {
            res.sendStatus(404, "Error while finding memes trending topics");
        }
    } else {
        res.sendStatus(404, "Email not found");
    }
});


//API || GET || GET ALL MEME BASED ON TRENDING TOPICS || TRENDING SECTION SCREEN
router.get("/getAllTrendingMemes", auth, async (req, res) => {
    const email = req.email.id;

    const checkEmail = MemeUser.find({ email });

    if (checkEmail) {
        try {
           
        } catch (e) {
            res.sendStatus(404, "Error while finding memes");
        }
    } else {
        res.sendStatus(404, "Email not found");
    }
});


//API // GET // GET ALL MEMES BASED ON CATEGORY WHICH IS MEME TAG || SEARCH BY MEME TAG
router.post("/getMemeByCategory", async (req, res) => {
    // const email = req.email.id;
    // const tag = req.body.memeTag;

    // const checkEmail = MemeUser.find({ email });

    // if (checkEmail) {
        try {
           const memes = await MemeUser.aggregate(
            [
                {
                  '$match': {
                    'user_memes.meme_type': 'funny'
                  }
                }, {
                  '$project': {
                    'user_memes': 1
                  }
                }, {
                  '$group': {
                    '_id': 'id', 
                    'all': {
                      '$push': '$user_memes'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0
                  }
                }
              ]
           )

           res.json(memes)
        } catch (e) {
            res.sendStatus(404, "Error while finding memes");
        }
    // } else {
    //     res.sendStatus(404, "Email not found");
    // }
});


//API || GET || GET ALL MEMES OF USER || USE AUTH TOKEN TO GET  EMAIL

//API || POST || GET SINGLE USER


//API || GET || GET MEME OF THE DAY 


module.exports = router;
