const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
//Model MemeUser
const { MemeUser } = require("../../model/memeUser");

//Model Admin control
const { adminControl } = require("../../model/AdminControl");

//Multer file upload
const upload = require("../../multer");

const cloudinary = require("cloudinary").v2;

const auth = require("../../middleware/auth");

//Admin control
//Count number of user
//GET
router.get("/getTotalUsers", auth, async (req, res) => {
  try {
    const data = await MemeUser.find({});
    res.json(data.length);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Joined today
router.get("/userJoinedToday", async (req, res) => {
  try {
    const date = new Date().toLocaleDateString();
    MemeUser.find({})
      .where("joining_date")
      .equals(date)
      .exec((err, result) => {
        console.log(result);
      });

    // res.json(data)
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control API
// To limit the control of meme uploads per day
router.post("/memeCount", auth, async (req, res) => {
  try {
    const memeCount = req.body.meme_count;
    const data = await adminControl.findOneAndUpdate(
      { role: "Admin" },
      { meme_count: memeCount }
    );
    res.json(data);
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });

      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control API
//GET API
// To limit the control of meme uploads per day
router.get("/memeCount", async (req, res) => {
  try {
    const data = await adminControl.find({}, { meme_count: 1 });
    res.json(data[0].meme_count);
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });

      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
// Add meme tags
router.post("/memeTags", auth, async (req, res) => {
  try {
    const memeTags = req.body.meme_tag;
    const data = await adminControl.findOneAndUpdate(
      { role: "Admin" },
      { $push: { meme_tags: memeTags } }
    );
    res.json(data);
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });
      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
// Get all meme tags
router.get("/memeTags", auth, async (req, res) => {
  try {
    const data = await adminControl.find({}, { meme_tags: 1 });
    res.json(data[0]);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Delete meme tag
//POST request
router.post("/deleteMemeTag", auth, async (req, res) => {
  const memeTag = req.body.memeTag;

  try {
    const data = await adminControl.update(
      {},
      { $pull: { meme_tags: { $in: [memeTag] } } }
    );
    res.json(data);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
// Add meme trending topics || trending tags
router.post("/memeTrend", auth, async (req, res) => {
  const memeTrending = req.body.meme_trend;

  try {
    const data = await adminControl.findOneAndUpdate(
      { role: "Admin" },
      { $push: { meme_trending_topics: memeTrending } }
    );
    res.json(data);
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });
      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Get all Trending meme topics
router.get("/memeTrend", auth, async (req, res) => {
  try {
    const data = await adminControl.find({}, { meme_trending_topics: 1 });
    res.json(data[0]);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Upload meme of the day
router.post("/memeOfTheDay", auth, async (req, res) => {
  try {
    const date = new Date().toLocaleDateString();
    const memeId = req.body.meme_ID;
    const data = await adminControl.findOneAndUpdate(
      { role: "Admin" },
      { $push: { meme_of_the_day: { date, meme_id: memeId } } }
    );
    res.json(data);
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });
      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
// Get meme of the day
//GET request
router.get("/memeOfTheDay", auth, async (req, res) => {
  try {
    const Cdate = new Date().toLocaleDateString();
    const data = await adminControl.find({}, { meme_of_the_day: 1 });
    const currentData = await data[0].meme_of_the_day.map(one => {
      if (one.date == Cdate) {
        return one;
      }
    });
    console.log(currentData);
    res.json(currentData);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Upload trophy segment
//POST request
router.post(
  "/trophySegment",
  auth,
  upload.single("imageData"),
  async (req, res) => {
    // console.log(imageData
    console.log(req.file);
    try {
      const result_image = await cloudinary.uploader.upload(req.file.path, {
        quality: 30,
        fetch_format: "auto"
      });
      const image = result_image.secure_url;
      const name = req.body.trophy_name;
      const uploads = req.body.trophy_uploads;
      const data = await adminControl.findOneAndUpdate(
        { role: "Admin" },
        { $push: { trophy: { name, image, uploads } } }
      );
      res.json(data);
      if (!data) {
        let adminRole = new adminControl({
          role: "Admin"
        });
        adminRole.save().then(result => {
          res.json(result);
        });
      }
    } catch (err) {
      res.sendStatus(500).send("server error");
    }
  }
);

//Admin control
//Get trophy segment details || trophy name || trophy image || trophy limits
//GET request
router.get("/trophySegment", async (req, res) => {
  try {
    const data = await adminControl.find({}, { trophy: 1 });
    res.json(data[0].trophy);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Delete trophy segment by ID
//DELETE request
router.delete("/deleteTrophySegment/:trophyID", auth, async (req, res) => {
  // const trophyID = req.body.trophyID;

  try {
    const data = await adminControl.update(
      {},
      // {$pull:{trophy:{$in:[trophyID]}}}
      { $pull: { trophy: { _id: { $in: [req.params.trophyID] } } } }
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Update trophy segment
//update trophy segment || trophy name || trophy image || trophy uploads
router.put("/updateTrophySegment", auth, async (req, res) => {
  const trophyID = req.body.trophyID;
  const name = "upsadate";
  const image = "upsadate";
  const uploads = 12;
  try {
    const data = await adminControl.updateOne(
      {
        "trophy._id": trophyID
      },
      {
        $set: {
          "trophy.$.name": name,
          "trophy.$.image": image,
          "trophy.$.uploads": uploads
        }
      }
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
// Mobile app's home page event banner || upcoming event
router.post("/upcomingEvent", upload.single("imageData"),auth, async (req, res) => {
  try {
    const result_image = await cloudinary.uploader.upload(req.file.path, {
      quality: "auto",
      fetch_format: "auto"
    });
    const name = req.body.eventName;
    const date = req.body.eventDate;
    const image = result_image.secure_url;
    // console.log("formData", event_image, event_name, event_date);

    const data = await adminControl.findOneAndUpdate(
      { role: "Admin" },
      { $push: { upcoming_event: { name, date, image } } }
    );
    res.json(data)
    if (!data) {
      let adminRole = new adminControl({
        role: "Admin"
      });
      adminRole.save().then(result => {
        res.json(result);
      });
    }
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Get upcoiming event details || event name || event image || event date
//GET request
router.get("/upcomingEvent", auth,async (req, res) => {
  try {
    const data = await adminControl.find({}, { upcoming_event: 1 });
    res.json(data[0].upcoming_event);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Delete upcoiming event by ID
//DELETE request
router.delete("/upcomingEvent/:upcomingEventID", auth, async (req, res) => {
  // const upcomingEventID = req.body.upcomingEventID;
  try {
    const data = await adminControl.update(
      {},
      // {$pull:{trophy:{$in:[trophyID]}}}
      { $pull: { upcoming_event: { _id: { $in: [req.params.upcomingEventID] } } } }
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

//Admin control
//Update upcomingEvent
//update upcoiming event details || event name || event image || event date
router.put("/upcomingEvent", auth, async (req, res) => {
  const upcomingEventID = req.body.upcomingEventID;
  const name = "update";
  const image = "update";
  const date = 12;
  try {
    const data = await adminControl.updateOne(
      {
        "trophy._id": upcomingEventID
      },
      {
        $set: {
          "trophy.$.name": name,
          "trophy.$.image": image,
          "trophy.$.date": date
        }
      }
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    res.sendStatus(500).send("server error");
  }
});

module.exports = router;
