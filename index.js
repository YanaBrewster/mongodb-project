const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // to parse all data coming from user and database
const cors = require('cors'); // to include cross origin requests
const bcryptjs = require('bcryptjs'); // to hash and compare passwords in an effective way
const config = require('./config.json'); // store creditials
const product = require('./products.json'); // external json data
const dbProduct = require('./models/products.js');
const User = require('./models/users.js');
const Product = require('./models/products.js');

const port = 3000;
// connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}-ygo7y.mongodb.net/shop?retryWrites=true&w=majority`
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected'))
.catch(err =>{
  console.log(`DBConnectionError: ${err.message}`);
});

// test connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected to MongoDB');
});

// connect endpoints
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//include this to go to the next middleware
});

// include body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

// parameters

app.get('/allProducts', (req,res)=>{
  res.json(product)
});

app.get('/products/p=:id', (req,res) =>{
const idParam = req.params.id;
  for (let i = 0; i < product.length; i++){
    if (idParam.toString() === product[i].id.toString()) {
      res.json(product[i]);
    }
  }
});

app.get('/products/n=:name', (req,res) =>{
const nameParam = req.params.name;
  for (let i = 0; i < product.length; i++){
    if (nameParam.toLowerCase() === product[i].name.toLowerCase()) {
      res.json(product[i]);
    }
  }
});

app.get('/products/pr=:price', (req,res) =>{
const priceParam = req.params.price;
  for (let i = 0; i < product.length; i++){
    if (priceParam.toString() === product[i].price.toString()) {
      res.json(product[i]);
    }
  }
});

//register user

app.post('/registerUser', (req,res) =>{
  //checking if user is found in the db already
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      res.send('Username already taken. Please choose another name');
    } else{
      const hash = bcryptjs.hashSync(req.body.password); //hash the password
      const user = new User({
        _id : new mongoose.Types.ObjectId,
        username : req.body.username,
        email : req.body.email,
        password : hash
      });

      user.save().then(result =>{
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
});

// get all users

app.get('/allUsers', (req,res) =>{
  User.find().then(result =>{
      res.send(result);
  })
});

// login the user

app.post('/loginUser', (req,res) =>{
  User.findOne({username:req.body.username},(err,userResult) => {
    if (userResult){
      if (bcryptjs.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('not authorized');
      }
    } else {
      res.send('user not found. Please register');
    }
  });
});

// keep this at the end so errors can be seen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
