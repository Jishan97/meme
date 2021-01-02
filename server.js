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
var { screenOverlay } = require("./model/ScreenOverlay");

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

// app.use(checkNet);

app.get("/index", (req, res) => {
  res.render("index");
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
    const email = req.body.email;
    const meme_title = req.body.title;
    const meme_description = req.body.description;
    const meme_type = req.body.type;
    const meme_by_avatar = req.body.userImage
    const meme_by_username = req.body.username
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
      meme_createdAt,
      meme_by_avatar,
      meme_by_username
    });



    /// redirecting to notification area

    allMemes.save(result => {
      res.json('success')
    });

    
  } catch (e) {
    res.json(e)
  }
  
});



//USER SIDE
// Admin login / Auth
app.use('/api/auth',require('./routes/user/Authentication'));

app.use('/api',require('./routes/user/UserControl'));


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Admin login / Auth
app.use('/api/admin',require('./routes/admin/Admin'))

//Admin control
app.use('/api/admin/adminControl',require('./routes/admin/AdminControl'))

//Admin || Users
app.use('/api/admin/users',require('./routes/admin/Users'))






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




const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`running on ${port}`);
});
