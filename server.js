const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cloudinary = require("cloudinary").v2;
var { mongoose } = require("./db/mongoose");
var { MemeUser } = require("./model/memeUser");
var { MemeData } = require("./model/memeCollection");
var { adminSetMTT } = require("./model/adminSetMTT");
var { contactUs } = require("./model/contactUs");
var { expoID } = require("./model/expoID");
var { AllMemeTT } = require("./model/AllMemeTT");
var { trophySegment } = require("./model/trophySegment");
var { memeStar } = require("./model/memeStar");

const { Expo } = require("expo-server-sdk");
const expo = new Expo();

const upload = require("./multer");
const path = require("path");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const authTokens = {};
var session = require("express-session");
var serveIndex = require("serve-index");
const checkNet = require("./middleware");

var cors = require("cors");
app.use(cors());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "Shh, its a secret!"
    // cookie: { secure: true }
  })
);

app.use(
  "/.well-known",
  express.static(".well-known"),
  serveIndex(".well-known")
);

require("./cloudinary");

const getHashedPassword = password => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};
app.use(cookieParser());

app.use((req, res, next) => {
  const authToken = req.cookies["AuthToken"];
  req.user = authTokens[authToken];
  next();
});

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
    // helpers: require('./helpers')
  })
);

app.set("view engine", "handlebars");

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/public"));

app.use(checkNet);

app.get("/index", (req, res) => {
  res.render("index");
});

// -------------------------   POST
// ALL MEMES POST REQUEST  start
//  -------------------------
app.post("/getAllmemes", async (req, res) => {
  // get username or email from front end local storage or session or chace
  const username = req.body.username;
  if (username) {
    try {
      const allMemes = await MemeData.find().sort({ _id: -1 });
      res.json(allMemes);
    } catch (error) {
      res.status(500).send('Something broke!')
    }
  } else {
    // not login
    res.json({ msg: "You are not logged in" });
  }
});
// -------------------------   POST
//  ALL MEMES POST REQUEST
// end -------------------------

// -------------------------   GET
//  API end point | meme tags
// start -------------------------
app.get("/memeTags", async (req, res) => {
  try {
    
    const memeTag = await AllMemeTT.find({ memeTT: "memeTag" });
    console.log(memeTag);
    res.json(memeTag);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }
});

// -------------------------   GET
//  API end point | meme trends
// start -------------------------
app.get("/memeTrends", async (req, res) => {

  try {

    const memeTrend = await AllMemeTT.find({ memeTT: "memeTrend" });
    console.log(memeTrend);
    res.json(memeTrend);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }
});



app.get("/memeS", (req, res) => {
  res.render("memeS");
});

// -------------------------   GET
//  API end point | Get array of trending memes
// start -------------------------

app.get("/getTrendingMemesArray", async (req, res) => {

  try{

    const mainD = await MemeData.find({});
  
    const memeAtrending = await adminSetMTT.find({});
  
    const memeArray = [];
    const finalMemeArray = []; /* Final data for array of trending memes*/
  
    memeAtrending.map(one => {
      memeArray.push(one.memeTrendSA);
    });
    memeArray[0].map(one => {
      mainD.map(two => {
        if (two.meme_trend == one) {
          finalMemeArray.push(two);
        }
      });
    });
    res.json(finalMemeArray);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }
});

// -------------------------   GET
//  API end point | Get Single trending meme | meme of the day
// start -------------------------
app.get("/getTrendingMemesSingle", async (req, res) => {
  try{

    const mainD = await MemeData.find({});
  
    const memeAtrending = await adminSetMTT.find({});
  
    const singleMeme = [];
    const finalMemeSingle = []; /* final data for single trendig meme */
    memeAtrending.map(one => {
      singleMeme.push(one.memeTrendS);
    });
    
    const finalSingleMeme = singleMeme[0]
  
      mainD.map(two => {
        if (two.meme_trend == finalSingleMeme) {
          finalMemeSingle.push(two);
        }
      });
  
    res.json(finalMemeSingle);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }
});

// -------------------------   POST
//  API end point | Get all memes of user
// start -------------------------

app.post("/userMemes", async (req, res) => {
  const user = req.body.email;
  if (user) {
    try{

      const data = await MemeUser.find({ email: user });
      const userAllMemes = [];
      let FinalUserAllMemes = [];
  
      data.map(one => {
        userAllMemes.push(one.user_memes);
      });
      FinalUserAllMemes = userAllMemes[0];
      console.log(FinalUserAllMemes);
      res.json(FinalUserAllMemes);
    }
    catch (error) {
      res.status(500).send('Something broke!')
    }
  } else {
    res.sendStatus(403);
  }
});

// -------------------------   POST
//  API end point | register with google
// start -------------------------
app.post("/registerGoogle", async (req, res) => {

  const date = new Date().toLocaleDateString();
  const username = req.body.username;
  const email = req.body.email;
  const user_avatar = req.body.userAvatar;
  const data = await MemeUser.find({ email });

  try{

    if (data.length <= 0) {
      var user = new MemeUser({
        username,
        email,
        user_avatar,
        joining_date: date
      });
  
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

// -------------------------   POST
//  API end point | upload memes
// start -------------------------

app.post("/imageUploadTrial", upload.single("imageData"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      quality: "auto",
      fetch_format: "auto"
    });
    const meme_createdAt = new Date().toLocaleDateString();
    const meme_image = result.secure_url;
    const email = req.body.username;
    const meme_title = req.body.title;
    const meme_description = req.body.description;
    const meme_type = req.body.type;
    console.log(meme_type);
    const meme_by = req.body.username;
    const meme_trend = req.body.trend;
    var memeD = {
      meme_image,
      meme_title,
      meme_description,
      meme_type,
      // meme_trend,
      meme_createdAt,
      meme_trend
    };

    MemeUser.findOneAndUpdate({ email }, { $push: { user_memes: memeD } })
      .then(url => {
        console.log(url);

        // res.send(url)
      })
      .catch(e => console.log(e));

    const allMemes = new MemeData({
      meme_image,
      meme_title,
      meme_description,
      meme_type,
      meme_by,
      meme_trend,
      meme_createdAt
    });

    /// redirecting to notification area

    allMemes.save(result => {
      res.json('success')
    });

    
  } catch (e) {
    res.json(e)
  }
  
});

// -------------------------   POST
//  API end point | memes category
// start -------------------------

app.get("/GetdankMemes", async (req, res) => {
  try {

    const allMemes = await MemeData.find({ meme_type: "#dank" });
    res.json(allMemes);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }

});

app.get("/GetindianMemes", async (req, res) => {
  try{
    const allMemes = await MemeData.find({ meme_type: "#indian" });
    res.json(allMemes);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }

});

app.get("/GetfunnyMemes", async (req, res) => {
  try{
    const allMemes = await MemeData.find({ meme_type: "#funny" });
    res.json(allMemes);    
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }

});

app.get("/GetadultMemes", async (req, res) => {
  try{
    const allMemes = await MemeData.find({ meme_type: "#adult" });
    res.json(allMemes);
  }
  catch (error) {
    res.status(500).send('Something broke!')
  }

});

// -------------------------   GET
//  API end point | Setting meme trends
// start -------------------------
app.get("/setMemeTrend", async (req, res) => {
  
  const data = await AllMemeTT.find({}).sort({ _id: -1 });
  const data1 = await AllMemeTT.find({ memeTT: "memeTrend" });
  const memeAtrendingSingle = await adminSetMTT.find({});
  const memeTrendingArray = [];
  memeAtrendingSingle.map(one => {
    one.memeTrendSA.map(one => {
      memeTrendingArray.push(one);
    });
  });
  
  res.render("setMemeTrend", {
    data,
    data1,
    memeAtrendingSingle,
    memeTrendingArray
  });
});

app.post("/DeleteMemeTrend", (req, res) => {
  const id = req.body.id;
  console.log(id);

  AllMemeTT.findByIdAndRemove(id, function(err, deletedStandUp) {
    // handle any potential errors here
    res.redirect("/setMemeTrend");
  });
});

app.post("/UpdateMemeTrend", (req, res) => {
  const id = req.body.id;
  console.log(id);
  const filter = {
    id: id
  };
  AllMemeTT.findOneAndUpdate(filter, update).then(result => {
    console.log(result);
    res.redirect("/setMemeTrend");
  });
});

app.post("/setMemeTrend", (req, res) => {
  const memeTitle = req.body.memeTitle;
  const memeTT = req.body.memeTT;

  var memed = new AllMemeTT({
    memeTitle,
    memeTT
  });

  memed.save().then(data => {
    console.log(data);
    res.redirect("/setMemeTrend");
  });
});

app.get("/adultMemes", async (req, res) => {
  const allMemes = await MemeData.find({ meme_type: "#adult" });
  console.log(allMemes);
  res.render("adultMemes", {
    allMemes
  });
});

app.post("/selectMemeTrendA", async (req, res) => {
  const memes = req.body.memA;
  console.log(memes);

  const Admin = await adminSetMTT.find({});
  const role = "admin";

  if (Admin.length > 0) {
    console.log("going in if");
    adminSetMTT.findOneAndRemove(role, function(err, deletedStandUp) {
      // handle any potential errors here
      // res.redirect('/setMemeTrend');
    });

    const allMemes = new adminSetMTT({
      role: "admin",
      memeTrendSA: memes
    });

    // adminSetMTT.findOneAndUpdate({role}, { $push : {memeTrendSA:memes}})
    // .then((url)=>{
    //     console.log(url);
    //     res.redirect('/setMemeTrend')
    //     // res.send(url)
    //   }).catch(e=>console.log(e))

    allMemes.save().then(data => {
      console.log(data);
      res.redirect("/setMemeTrend");
    });
  } else {
    const allMemes = new adminSetMTT({
      role: "admin",
      memeTrendSA: memes
    });

    console.log("going in else");
    allMemes.save().then(data => {
      console.log(data);
      res.redirect("/setMemeTrend");
    });
  }
});

app.post("/selectMemeTrendS", (req, res) => {
  const memes = req.body.memeS;
  console.log(memes);

  // const Admin = await adminSetMTT.find({})
  const role = "admin";

  adminSetMTT
    .findOneAndUpdate({ role }, { memeTrendS: memes })
    .then(url => {
      console.log(url);
      res.redirect("/setMemeTrend");
    })
    .catch(e => console.log(e));
});

app.post("/memeTrendIndi", async (req, res) => {
  const memeTrend = req.body.memeTrend;
  console.log(memeTrend);

  const allMemes = await MemeData.find({ meme_trend: memeTrend });

  console.log(allMemes);

  res.render("memeTrendIndi", {
    allMemes,
    memeTrend
  });
});

app.post("/admin/contactUs", async (req, res) => {
  const email = req.body.email;
  const msg = req.body.msg;

  var data = new contactUs({
    email,
    msg
  });

  const responseD = await data.save();
  console.log(responseD);
  res.redirect("/homePage");
});

app.get("/joinUs", (req, res) => {
  res.render("joinUs");
});

// push notification expo


app.get('/auth/notification',(req,res)=>{
  res.render('notification')
})


app.post("/expoPush", async (req, res) => {
  const fetchedData = await expoID.find({});
  let expoIDdata = req.body.expoID;

  fetchedData.map(one => {
    if (one.expoid != expoIDdata) {
      var data = new expoID({
        expoid: expoIDdata
      });

      data.save().then(savedD => {
        console.log(savedD);
      });
      console.log(expoIDdata);
    } else {
      console.log(`Device's expoID already present`);
    }
  });
});

app.post("/auth/sendPushNotification", async (req, res) => {
  const data = await expoID.find({});

  let title = req.body.title;
  let body = req.body.body1;
console.log(title)
  let expoIDs = [];

  data.map(one => {
    expoIDs.push(one.expoid);
  });

  console.log(expoIDs);

  let notifications = [];
  for (let pushToken of expoIDs) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: { body }
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  res.redirect("/auth/notification");
});

// API SECTION
// GET ALL USERS
// GET

app.get("/auth/getUsers", async (req, res) => {
  const allUsers = await MemeUser.find({});
  console.log(allUsers);
  res.json(allUsers);
});

// API SECTION
// GET SIngle user
// GET

app.post("/auth/getSingleUser", async (req, res) => {
  const userEmail = req.body.email;
  const allUsers = await MemeData.find({ meme_by: userEmail });
  console.log('single user--------------------------',allUsers)
  res.json(allUsers);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADMIN SECTION
// ENTRY
// GET
app.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/auth/adminDashboard");
  } else {
    res.redirect("/auth/adminLogin");
  }
});

// ADMINDASHBOARD
// GET
app.get("/auth/adminDashboard", async (req, res) => {
  const user = await MemeUser.find({});
  const totalUser = user.length;
  const date = new Date().toLocaleDateString();
  const joinedToday = [];

  user.map(one => {
    if (one.joining_date === date) {
      joinedToday.push(one);
    }
  });
  const totalJoinedToday = joinedToday.length;
  console.log(totalJoinedToday);

  const memeOfTheDay = await adminSetMTT.find({});

  const memeTrendingArray = [];

  memeOfTheDay.map(one => {
    one.memeTrendSA.map(one => {
      memeTrendingArray.push(one);
    });
  });

  res.render("adminDashboard", {
    totalUser,
    joinedToday,
    memeTrendingArray,
    memeOfTheDay
  });
});

// ADMIN SECTION
// ADMIN LOGIN
// GET
app.get("/auth/adminLogin", (req, res) => {
  res.render("adminLoginPage", {
    layout: false
  });
});

// ADMIN SECTION
// GET ALL MEMES
// GET
app.get("/auth/allMemes", async (req, res) => {
  // if(req.user) {
  // console.log(req.checkRole)
  const allMemes = await MemeData.find({});

  res.render("allMemes", {
    allMemes
  });

  // }  else {
  // res.redirect('/adminLogin')
  // }
});

// ADMIN SECTION
// Validate Admin
// POST
app.post("/auth/validateAdmin", (req, res) => {
  const emailCheck = "admin@admin.com";
  const passwordCheck = "admin";

  const mangerEmail = "manager@manager.com";
  const managerPassword = "manager";

  const email = req.body.email;
  const password = req.body.password;

  if (email === emailCheck && password === passwordCheck) {
    req.session.role = "admin";
    console.log(email, password);
    const authToken = generateAuthToken();
    authTokens[authToken] = email;
    res.cookie("AuthToken", authToken);

    res.redirect("/");``
  } else if (email === mangerEmail && password === managerPassword) {
    req.session.role = "manager";
    const authToken = generateAuthToken();
    authTokens[authToken] = email;
    res.cookie("AuthToken", authToken);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

// ADMIN SECTION
// DELETE MEMES
// POST
app.post("/authDeleteMeme", async (req, res) => {
  const memeId = req.body.memeID;
  await MemeData.findByIdAndRemove(memeId);
  res.redirect("/admin/allMemes");

  console.log(memeId);
});

// ADMIN SECTION
// ADMIN HOMEPAGE
// GET
app.get("/auth/adminHomePage", (req, res) => {
  if (!req.session.role) {
    res.redirect("/");
  }
  console.log(req.session.role);
  res.render("adminHomePage");
});

// ADMIN SECTION
// GET ALL USERS
// GET

app.get("/auth/getAllUsers", async (req, res) => {
  const allUsers = await MemeUser.find({});
  console.log(allUsers);

  res.render("allUsers", {
    allUsers
  });
});

// ADMIN SECTION
// GET trophySegment
// GET

app.get("/auth/trophySegment", async (req, res) => {
  const getTrophySegment = await trophySegment.find({});

  res.render("trophySegment", {
    getTrophySegment
  });
});

// ADMIN SECTION
// trophySegment
// POST

app.post("/auth/trophySegment", upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const trophyImage = result.secure_url;
  const trophyPoints = req.body.trophyPoints;
  const trophyType = req.body.trophyType;
  const trophyName = req.body.trophyName;

  const getTrophySegment = await trophySegment.find({ trophyType });

  if (getTrophySegment.length > 0) {
    trophySegment
      .findOneAndUpdate(
        { trophyType },
        { $set: { trophyImage, trophyPoints, trophyName } }
      )
      .then(url => {
        console.log(url);
        res.redirect("/auth/trophySegment");
      });
  } else {
    const data = new trophySegment({
      trophyImage,
      trophyPoints,
      trophyType,
      trophyName
    });

    data.save().then(result => {
      console.log(result);
      res.redirect("/auth/trophySegment");
    });
  }
});

app.post("/auth/authViewUsersMemes", async (req, res) => {
  const data = await MemeData.find({ meme_by: req.body.userID });
  // const memeMemes = data.user_memes

  res.render("userMemes", {
    data
  });
});

app.post("/auth/authBlockuser", async (req, res) => {
  MemeUser.findByIdAndUpdate(
    req.body.userID,
    { user_status: "block" },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/auth/getAllUsers");
      }
    }
  );
});

app.post("/auth/authUnBlockuser", async (req, res) => {
  MemeUser.findByIdAndUpdate(
    req.body.userID,
    { user_status: "unblock" },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/auth/getAllUsers");
      }
    }
  );
});

// app.get('/auth/memeStarPage',(req,res)=>{

// })

app.get("/auth/memeStarPage", async (req, res) => {
  const data = await memeStar.find({});
  res.render("memeStar", {
    data
  });
});

app.post("/auth/makeMemeStar", async (req, res) => {
  MemeUser.findOneAndUpdate(
    { email: req.body.userID },
    { user_tag: "memeStar" },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/auth/getAllUsers");
      }
    }
  );

  const user = MemeUser.find({ email: req.body.userID });
  console.log(user);
});

app.post("/auth/removeStar", async (req, res) => {
  MemeUser.findOneAndUpdate(
    { email: req.body.userID },
    { user_tag: "noob" },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/auth/getAllUsers");
      }
    }
  );

  const user = MemeUser.find({ email: req.body.userID });
  console.log(user);
});

// console.log(data1)

app.post("/auth/MemeStar", async (req, res) => {
  const noOfUploads = req.body.uploadLimit;
  const checkData = await memeStar.find({});
  // console.log(noOfUploads)
  const filter = { role: "admin" };
  const update = { NoOfUploads: noOfUploads };

  if (checkData.length <= 0) {
    var data = new memeStar({
      NoOfUploads: noOfUploads
    });

    data.save().then(one => {
      res.redirect("/auth/memeStarPage");
    });
  } else {
    await memeStar.findOneAndUpdate(filter, update);
    res.redirect("/auth/memeStarPage");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});
