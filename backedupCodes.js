app.get("/notification", async (req, res) => {
  if (req.user) {
    const session_email = req.session.session_email;

    const allMemes = await MemeUser.find({ email: session_email }).sort({
      _id: -1
    });

    var uploadedMemes = [];

    allMemes.map(one => {
      uploadedMemes = one.user_memes;
    });

    const uploadedMemes1 = uploadedMemes.reverse();

    console.log(uploadedMemes);
    // res.send(uploadedMemes)
    res.render("notification", {
      uploadedMemes1
    });
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});




app.get("/homePage", async (req, res) => {
  console.log("opening home page");
  if (req.user) {
    const allMemes = await MemeData.find().sort({ _id: -1 });
    console.log("allmeme", allMemes);
    const memeTrendTag = await AllMemeTT.find({});
    const memeAtrending = await adminSetMTT.find({});
    const memeArray = [];
    /* Final data for array of trending memes*/
    memeAtrending.map(one => {
      memeArray.push(one.memeTrendSA);
    });
    const finalMemeArray = memeArray[0];
    console.log(memeArray);
    res.render("homePage", {
      allMemes,
      memeTrendTag,
      finalMemeArray
    });
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
  //     const allMemes = await MemeData.find().sort({_id:-1})

  // res.render('homePage',{
  //         allMemes
  //       });
});




app.get("/memeUpload", (req, res) => {
  if (req.user) {
    res.render("memeUpload");
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});





app.get("/memeUpload2", async (req, res) => {
  if (req.user) {
    const memeTag = await AllMemeTT.find({ memeTT: "memeTag" });
    const memeTrend = await AllMemeTT.find({ memeTT: "memeTrend" });

    console.log(memeTrend);
    res.render("memeUpload2", {
      memeTag,
      memeTrend
    });
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});








app.get("/trendingPage", async (req, res) => {
  // if(req.user){
  const mainD = await MemeData.find({});

  const memeAtrending = await adminSetMTT.find({});

  const memeArray = [];
  const finalMemeArray = []; /* Final data for array of trending memes*/

  const singleMeme = [];
  const finalMemeSingle = []; /* final data for single trendig meme */
  // console.log(memeAtrending);

  memeAtrending.map(one => {
    memeArray.push(one.memeTrendSA);
  });
  memeAtrending.map(one => {
    singleMeme.push(one.memeTrendS);
  });

  memeArray[0].map(one => {
    mainD.map(two => {
      if (two.meme_trend == one) {
        finalMemeArray.push(two);
      }
    });
  });

  singleMeme.map(one => {
    mainD.map(two => {
      if (two.meme_trend == one) {
        finalMemeSingle.push(two);
      }
    });
  });
  // console.log(finalMemeArray)

  console.log("array if meme", finalMemeSingle);

  res.render("trendingPage", {
    finalMemeArray,
    finalMemeSingle
  });

  // }

  //   else {
  //     res.render('login', {
  //         message: 'Please login to continue',
  //         messageClass: 'alert-danger'
  //     });
  // }
});





app.get("/register", (req, res) => {
  res.render("register");
});



app.get("/profile", async (req, res) => {
  if (req.user) {
    const session_email = req.session.session_email;
    const data = await MemeUser.find({ email: session_email });
    console.log("session email", session_email);

    var copyD = "";

    userMemes = data[0].user_memes;

    console.log("object", copyD);

    //user total meme

    const totalMeme = userMemes.length;
    console.log("total memens of session email", totalMeme);

    console.log("session user meme", data);
    res.render("profile", {
      data,
      totalMeme
    });
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});




// posting user data register
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log(username);
  console.log(email);
  console.log(password);

  const data = await MemeUser.find({ username });
  console.log(data);

  if (password === confirmPassword) {
    if (data > 0) {
      res.render("register", {
        message: "User already registered.",
        messageClass: "alert-danger"
      });

      return;
    }

    const hashedPassword = getHashedPassword(password);

    var user = new MemeUser({ 
      username,
      email,
      password: hashedPassword
    });
    user.save().then(result => {
      console.log(result);
      res.send(result);
    });

    res.render("login", {
      message: "Registration Complete. Please login to continue.",
      messageClass: "alert-success"
    });
  } else {
    res.render("register", {
      message: "Password does not match.",
      messageClass: "alert-danger"
    });
  }
});




// login get request
app.get("/login", (req, res) => {
  res.render("login");
});

// login post request

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  req.session.session_email = req.body.email;
  console.log("this is session name", req.session.session_name);
  const hashedPassword = getHashedPassword(password);
  const data = await MemeUser.find({ email, password: hashedPassword });
  console.log(data);

  if (data.length > 0) {
    const authToken = generateAuthToken();
    authTokens[authToken] = email;
    res.cookie("AuthToken", authToken);
    res.redirect("/homePage");
    return;
  } else {
    res.render("login", {
      message: "Invalid username or password",
      messageClass: "alert-danger"
    });
  }
});

//protected routes

app.get("/protected", (req, res) => {
  if (req.user) {
    res.render("homePage");
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger"
    });
  }
});









app.post("/memeUploadVideo", upload.single("video"), async (req, res) => {
  console.log(req.file.path);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video"
    });
    const meme_video = result.secure_url;
    const email = req.session.session_email;
    const meme_title = req.body.title;
    const meme_description = req.body.description;
    const meme_type = req.body.type;
    const meme_by = req.session.session_email;
    const createdAt = Date.now();

    console.log("session username", email);
    console.log("image url", meme_video);

    var memeD = {
      meme_video,
      meme_title,
      meme_description,
      createdAt,
      meme_type
    };

    MemeUser.findOneAndUpdate({ email }, { $push: { user_memes_video: memeD } })
      .then(url => {
        console.log(url);
        res.send(url);
      })
      .catch(e => console.log(e));

    // const allMemes = new MemeData({
    //   meme_video,
    //   meme_title,
    //   meme_description,
    //   createdAt,
    //   meme_type
    // })

    // allMemes.save((result)=>{

    //   console.log(result)
    // })
    res.redirect("/homePage");

    console.log(result);
  } catch (error) {
    console.log(error);
  }
});





// uploading meme
app.post("/memeUpload", upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    quality: "auto",
    fetch_format: "auto"
  });

  console.log(req.file.path);
  // const meme_createdAt = new Date().toJSON().slice(0, 10);
  const meme_createdAt = new Date().toLocaleDateString();
  const meme_image = result.secure_url;
  const email = req.session.session_email;
  const meme_title = req.body.title;
  const meme_description = req.body.description;
  const meme_type = req.body.type;
  const meme_by = req.session.session_email;
  const meme_trend = req.body.trend;

  console.log("session username", email);
  console.log("image url", meme_image);

  var memeD = {
    meme_image,
    meme_title,
    meme_description,
    meme_type,
    meme_trend,
    meme_createdAt
  };

  MemeUser.findOneAndUpdate({ email }, { $push: { user_memes: memeD } })
    .then(url => {
      // console.log(url);
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
    // console.log(result)
  });

  res.redirect("/notification");
});

// Dank memes

app.get("/dankMemes", async (req, res) => {
  const allMemes = await MemeData.find({ meme_type: "#dank" });
  console.log(allMemes);
  res.render("dankMemes", {
    allMemes
  });
});

app.get("/indianMemes", async (req, res) => {
  const allMemes = await MemeData.find({ meme_type: "#indian" });
  console.log(allMemes);
  res.render("indianMemes", {
    allMemes
  });
});

app.get("/funnyMemes", async (req, res) => {
  const allMemes = await MemeData.find({ meme_type: "#funny" });
  console.log(allMemes);
  res.render("funnyMemes", {
    allMemes
  });
});





// -------------------------   GET 
//  API end point | 
// start -------------------------
app.get("/setMemeTrend", async (req, res) => {
  const data = await AllMemeTT.find({}).sort({ _id: -1 });
  const data1 = await AllMemeTT.find({ memeTT: "memeTrend" });

  const mainD = await MemeData.find({});
  const memeAtrending = await adminSetMTT.find({});

  const memeArray = [];
  const finalMemeArray = []; /* Final data for array of trending memes*/

  const singleMeme = [];
  const finalMemeSingle = []; /* final data for single trendig meme */
  // console.log(memeAtrending);

  memeAtrending.map(one => {
    memeArray.push(one.memeTrendSA);
  });
  memeAtrending.map(one => {
    singleMeme.push(one.memeTrendS);
  });

  memeArray[0].map(one => {
    mainD.map(two => {
      if (two.meme_trend == one) {
        finalMemeArray.push(two);
      }
    });
  });

  singleMeme.map(one => {
    mainD.map(two => {
      if (two.meme_trend == one) {
        finalMemeSingle.push(two);
      }
    });
  });

  console.log("array if meme", finalMemeArray);

  res.render("setMemeTrend", {
    data,
    data1,
    finalMemeArray,
    finalMemeSingle
  });
});
