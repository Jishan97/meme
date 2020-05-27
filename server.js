const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const cloudinary = require('cloudinary').v2;   
var {mongoose} = require('./db/mongoose');
var {MemeUser} = require('./model/memeUser');
var {MemeData} = require('./model/memeCollection');
var {adminSetMTT} = require('./model/adminSetMTT');
var {contactUs} = require('./model/contactUs');
var {expoID} = require('./model/expoID');
var {AllMemeTT} = require('./model/AllMemeTT')

const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const cors = require("cors");
app.use(cors());



const upload = require('./multer');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const authTokens = {};
var session = require('express-session');
var serveIndex = require('serve-index');
const checkNet = require("./middleware");




app.use(session({
  secret: "Shh, its a secret!"
}));

app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));


require('./cloudinary')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}
app.use(cookieParser());

app.use((req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    req.user = authTokens[authToken];
    next();
});



app.use(bodyParser.json()).use(bodyParser.urlencoded({
    extended: true
  }))
  
  app.engine('handlebars', exphbs({
  
    defaultLayout: 'main',
    // helpers: require('./helpers')
  }))
  
  
  app.set('view engine', 'handlebars')
  
  
  app.use(bodyParser.json()).use(bodyParser.urlencoded({
    extended: true
  }))
  
  app.use(express.static(__dirname + '/public'));
  

  app.use(checkNet)




app.get('/',(req,res)=>{


    res.redirect('/homePage')

  })


  app.get('/index',(req,res)=>{
    res.render('index')
  })

  app.get('/notification',async(req,res)=>{

      if(req.user){
    const session_email = req.session.session_email;

    const allMemes = await MemeUser.find({email:session_email}).sort({_id:-1})

    var uploadedMemes= [];



   

    allMemes.map((one)=>{
      uploadedMemes = one.user_memes
    })

    const  uploadedMemes1= uploadedMemes.reverse()

    console.log(uploadedMemes)
    // res.send(uploadedMemes)
    res.render('notification',{
      uploadedMemes1
    })

  }

  
  else {
    res.render('login', {
        message: 'Please login to continue',
        messageClass: 'alert-danger'
    });
}
  })





  app.get('/getAllMemes',(req,res)=>{

    

  })





  // -------------------------   POST  ALL MEMES GET REQUEST  start -------------------------
  app.post('/getAllmemes',async(req,res)=>{
    // get username or email from front end local storage or session or chace 
    const username = req.body.username;
    if(username){
      try {
        const allMemes = await MemeData.find().sort({_id:-1});
        res.json(allMemes)
      } catch (error) {
          console.log(error.message)
      }
    } 
    else{ 
      // not login
      res.json({msg:'You are not logged in'})
    }
  })
    // -------------------------   POST  ALL MEMES GET REQUEST  end -------------------------
  



    

  app.get('/homePage',async(req,res)=>{

    console.log('opening home page')
    if (req.user) {
      const allMemes = await MemeData.find().sort({_id:-1})
      console.log('allmeme',allMemes)
      const memeTrendTag = await AllMemeTT.find({})
      const memeAtrending = await adminSetMTT.find({})
      const memeArray = []
        /* Final data for array of trending memes*/
      memeAtrending.map((one)=>{
      memeArray.push(one.memeTrendSA)
      })
      const finalMemeArray = memeArray[0]
      console.log(memeArray)
      res.render('homePage',{
        allMemes,memeTrendTag,finalMemeArray
      });
  } 
  else {
      res.render('login', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
  //     const allMemes = await MemeData.find().sort({_id:-1})

  // res.render('homePage',{
  //         allMemes
  //       });

});













  app.get('/memeUpload',(req,res)=>{
    if (req.user){
    res.render('memeUpload')
    }
    
  else {
    res.render('login', {
        message: 'Please login to continue',
        messageClass: 'alert-danger'
    });
}
  
  })

  app.get('/memeUpload2', async(req,res)=>{
if(req.user){
    const memeTag = await AllMemeTT.find({memeTT:'memeTag'})
    const memeTrend = await AllMemeTT.find({memeTT:'memeTrend'})

    console.log(memeTrend)
    res.render('memeUpload2',{
      memeTag,memeTrend
    })
  }

    
  else {
    res.render('login', {
        message: 'Please login to continue',
        messageClass: 'alert-danger'
    });
}
  })


  app.get('/memeS',(req,res)=>{
    res.render('memeS')
  })


  app.get('/trendingPage', async(req,res)=>{
    if(req.user){
    const mainD = await MemeData.find({})
    const memeAtrending = await adminSetMTT.find({})
  
    const memeArray = []
    const finalMemeArray = []   /* Final data for array of trending memes*/
  
    const singleMeme=[]
    const finalMemeSingle = []  /* final data for single trendig meme */
    // console.log(memeAtrending);
  
  
    memeAtrending.map((one)=>{
      memeArray.push(one.memeTrendSA)
    })
    memeAtrending.map((one)=>{
      singleMeme.push(one.memeTrendS)
    })
  
    memeArray[0].map((one)=>{
      mainD.map((two)=>{
        if(two.meme_trend == one){
          finalMemeArray.push(two)
        }
      })
    })
  
     singleMeme.map((one)=>{
       mainD.map((two)=>{
         if(two.meme_trend == one){
           finalMemeSingle.push(two)
         }
       })
    })
  
  
    console.log('array if meme',finalMemeArray)
 

    res.render('trendingPage',{
      finalMemeArray,finalMemeSingle
    })

  }

  
  else {
    res.render('login', {
        message: 'Please login to continue',
        messageClass: 'alert-danger'
    });
}
  })

  app.get('/register', (req, res) => {
    res.render('register');
});


app.get('/profile', async(req, res) => {
  if(req.user){
  const session_email = req.session.session_email;
  const data = await MemeUser.find({email:session_email})
  console.log('session email',session_email)

  var copyD = '' ;

  userMemes = data[0].user_memes

  console.log('object',copyD)
  
  //user total meme

  const totalMeme = userMemes.length;
  console.log('total memens of session email',totalMeme)

  console.log('session user meme',data)
  res.render('profile',{
    data,totalMeme
  });
}

else {
  res.render('login', {
      message: 'Please login to continue',
      messageClass: 'alert-danger'
  });
}
});



  // posting user data register 
  app.post('/register', async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    console.log(username)
    console.log(email)
    console.log(password)

    const data = await MemeUser.find({username})
    console.log(data)

    if (password === confirmPassword) {
      if (data > 0) {

          res.render('register', {
              message: 'User already registered.',
              messageClass: 'alert-danger'
          });

          return;
      }

      const hashedPassword = getHashedPassword(password);

      var user = new MemeUser({
        username,
        email,
        password: hashedPassword

      });
      user.save()
      .then((result)=>{
        console.log(result);
        res.send(result)
      })

      res.render('login', {
          message: 'Registration Complete. Please login to continue.',
          messageClass: 'alert-success'
      });
  } else {
      res.render('register', {
          message: 'Password does not match.',
          messageClass: 'alert-danger'
      });
  }
     


  })



  // login get request
  app.get('/login', (req, res) => {
    res.render('login');
});

  // login post request 

  
app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  req.session.session_email = req.body.email;
  console.log('this is session name', req.session.session_name)
  const hashedPassword = getHashedPassword(password);
  const data = await MemeUser.find({email,password:hashedPassword})
console.log(data)

  if (data.length > 0 ) { 
      const authToken = generateAuthToken();
      authTokens[authToken] = email;
      res.cookie('AuthToken', authToken);
      res.redirect('/homePage');
      return;
  } else {
      res.render('login', {
          message: 'Invalid username or password',
          messageClass: 'alert-danger'
      });
  }
});


//protected routes

app.get('/protected', (req, res) => {
  if (req.user) {
      res.render('homePage');
  } else {
      res.render('login', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
});
app.post('/memeUploadVideo',upload.single('video'), async(req,res)=>{
  console.log(req.file.path)
  try {
  const result = await cloudinary.uploader.upload(req.file.path,{resource_type: "video"})
  const meme_video =result.secure_url;
  const email = req.session.session_email;
  const meme_title = req.body.title;
  const meme_description = req.body.description;
  const meme_type = req.body.type;
  const meme_by = req.session.session_email;
  const createdAt = Date.now();



  console.log('session username',email)
  console.log('image url',meme_video)

 var memeD = {
  meme_video,
  meme_title,
  meme_description,
  createdAt,
  meme_type,
 
  
  }


MemeUser.findOneAndUpdate({email}, { $push : {user_memes_video: memeD}})
.then((url)=>{
    console.log(url);
    res.send(url)
  }).catch(e=>console.log(e))

  


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
  res.redirect('/homePage'); 

  



  console.log(result)
  }

  catch(error){
    console.log(error)
  }
  
  

})



app.post('/imageUploadTrial',upload.single('image'), async(req,res)=>{


  const result = await cloudinary.uploader.upload(req.body.imageURL,{quality: "auto", fetch_format: "auto"});
  console.log(result.secure_url);

  res.json(result)


})





  // uploading meme 
  app.post('/memeUpload',upload.single('image'), async(req,res)=>{

  const result = await cloudinary.uploader.upload(req.file.path,{quality: "auto", fetch_format: "auto"});
  
  console.log(req.file.path)
  // const meme_createdAt = new Date().toJSON().slice(0, 10);
  const meme_createdAt=new Date().toLocaleDateString()
  const meme_image =result.secure_url;
  const email = req.session.session_email;
  const meme_title = req.body.title;
  const meme_description = req.body.description;
  const meme_type = req.body.type;
  const meme_by = req.session.session_email;
  const meme_trend = req.body.trend;



  console.log('session username',email)
  console.log('image url',meme_image)

 var memeD = {
  meme_image,
  meme_title,
  meme_description,
  meme_type,
  meme_trend,
  meme_createdAt
  
  
  }


MemeUser.findOneAndUpdate({email}, { $push : {user_memes: memeD}})
.then((url)=>{
    // console.log(url);
  
    // res.send(url)
  }).catch(e=>console.log(e))

  


  const allMemes = new MemeData({
    meme_image,
    meme_title,
    meme_description,
    meme_type,
    meme_by,
    meme_trend,
    meme_createdAt
  })
  
  /// redirecting to notification area

  
  allMemes.save((result)=>{

   
    // console.log(result)
  })

  res.redirect('/notification'); 
  

  })





// Dank memes 


app.get('/dankMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#dank'})
  console.log(allMemes)
  res.render('dankMemes',{
    allMemes
  })
})

/////////////////////////////////////////////////////////////////////////////////  GET  Memes
app.get('/GetdankMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#dank'})
  
  res.json(allMemes)

})

app.get('/GetindianMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#indian'})
  res.json(allMemes)
})

app.get('/GetfunnyMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#funny'})
  res.json(allMemes)
})

app.get('/GetadultMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#adult'})
  res.json(allMemes)
})
/////////////////////////////////////////////////////////////////////////////////  GET  Memes



app.get('/indianMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#indian'})
  console.log(allMemes)
  res.render('indianMemes',{
    allMemes
  })
})

app.get('/funnyMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#funny'})
  console.log(allMemes)
  res.render('funnyMemes',{
    allMemes
  })
})


//// /////////////////////////////////////////////////////////////////////////admin side to control all the meme trend
app.get('/setMemeTrend',async(req,res)=>{
  const data = await AllMemeTT.find({}).sort({_id:-1})
  const data1 = await AllMemeTT.find({memeTT:'memeTrend'})

  const mainD = await MemeData.find({})
  const memeAtrending = await adminSetMTT.find({})

  const memeArray = []
  const finalMemeArray = []   /* Final data for array of trending memes*/

  const singleMeme=[]
  const finalMemeSingle = []  /* final data for single trendig meme */
  // console.log(memeAtrending);


  memeAtrending.map((one)=>{
    memeArray.push(one.memeTrendSA)
  })
  memeAtrending.map((one)=>{
    singleMeme.push(one.memeTrendS)
  })

  memeArray[0].map((one)=>{
    mainD.map((two)=>{
      if(two.meme_trend == one){
        finalMemeArray.push(two)
      }
    })
  })

   singleMeme.map((one)=>{
     mainD.map((two)=>{
       if(two.meme_trend == one){
         finalMemeSingle.push(two)
       }
     })
  })


  console.log('array if meme',finalMemeArray)

 res.render('setMemeTrend',{
   data,data1,finalMemeArray,finalMemeSingle
 })
})

app.post('/DeleteMemeTrend',(req,res)=>{

  const id = req.body.id;
  console.log(id)
 
  AllMemeTT.findByIdAndRemove(id, function (err, deletedStandUp) {
    // handle any potential errors here
    res.redirect('/setMemeTrend');
  });

})


app.post('/UpdateMemeTrend',(req,res)=>{

  const id = req.body.id;
  console.log(id)
  const filter = {
    id: id
  };
  AllMemeTT.findOneAndUpdate(filter, update).then((result) => {
    console.log(result)
    res.redirect('/setMemeTrend')
  })


})


app.post('/setMemeTrend',(req,res)=>{

  const memeTitle = req.body.memeTitle;
  const memeTT =req.body.memeTT;

  var memed = new AllMemeTT({
  memeTitle,
  memeTT
})

memed.save().then((data)=>{
  console.log(data)
  res.redirect('/setMemeTrend')
})
})





app.get('/adultMemes',async(req,res)=>{

  const allMemes = await MemeData.find({meme_type:'#adult'})
  console.log(allMemes)
  res.render('adultMemes',{
    allMemes
  })
})

  
app.post('/selectMemeTrendA',async(req,res)=>{

 const memes = req.body.memA;
console.log(memes);
 

const Admin = await adminSetMTT.find({})
const role = 'admin'



if(Admin.length>0){
  const allMemes = new adminSetMTT({
    role:'admin',
    memeTrendSA:memes
  })
  
  console.log('going in if');
  adminSetMTT.findOneAndRemove(role, function (err, deletedStandUp) {
    // handle any potential errors here
    // res.redirect('/setMemeTrend');
  });
  
  // adminSetMTT.findOneAndUpdate({role}, { $push : {memeTrendSA:memes}})
  // .then((url)=>{
  //     console.log(url);
  //     res.redirect('/setMemeTrend')
  //     // res.send(url)
  //   }).catch(e=>console.log(e))

  allMemes.save().then((data)=>{
    console.log(data)
    res.redirect('/setMemeTrend')
  })


} 


else{
  const allMemes = new adminSetMTT({
    role:'admin',
    memeTrendSA:memes
  })
  
  console.log('going in else');
  allMemes.save().then((data)=>{
    console.log(data)
    res.redirect('/setMemeTrend')
  })
}


})



app.post('/selectMemeTrendS',(req,res)=>{


  const memes = req.body.memeS;
  console.log(memes);
   
  
  // const Admin = await adminSetMTT.find({})
  const role = 'admin'

  adminSetMTT.findOneAndUpdate({role}, { memeTrendS:memes})
.then((url)=>{
    console.log(url);
    res.redirect('/setMemeTrend')
  }).catch(e=>console.log(e))

    
})


app.post('/memeTrendIndi', async(req,res)=>{
  const memeTrend = req.body.memeTrend
  console.log(memeTrend);

  const allMemes = await MemeData.find({meme_trend:memeTrend})

  console.log(allMemes);

  res.render('memeTrendIndi',{
    allMemes,memeTrend
  })


})


app.post('/admin/contactUs', async(req,res)=>{
  const email = req.body.email;
  const msg = req.body.msg;


  var data = new contactUs({
    email,msg
  })

   const responseD = await data.save();
   console.log(responseD)
   res.redirect('/homePage')

})

app.get('/joinUs',(req,res)=>{
  res.render('joinUs')
})




// push notification expo 

app.post('/expoPush',async(req,res)=>{
  const fetchedData = await expoID.find({})
  let expoIDdata = req.body.expoID;

  fetchedData.map((one)=>{
    if(one.expoid !=expoIDdata) {
      var data = new expoID({
        expoid:expoIDdata
      })
    
         data.save().then((savedD)=>{
           console.log(savedD)
         })
       console.log(expoIDdata);
   
    }
    else{
      console.log(`Device's expoID already present`)
    }
  })

  


})




app.post('/sendPushNotification',async(req,res)=>{

const data = await expoID.find({})
let title = req.body.title;
let body = req.body.body1
let expoIDs = [];

data.map((one)=>{
  expoIDs.push(one.expoid)
})

console.log(expoIDs)

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

  res.redirect('/setMemeTrend')
  


})













const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`running on ${port}`)
})