const express = require('express')
const app = express();
const path = require('path');
const port = 4000
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://user1:pratik@cluster0.76piy4i.mongodb.net/?retryWrites=true&w=majority' );

const Users = mongoose.model('Users', { 
  username: String , 
  password: String ,
  likedPost : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ]

});

const Post = mongoose.model('Post', { business_name: String , business_owner_name: String , business_id: String , category : String , address : String , phone_number : String , required_funding : String , total_funding : String , about_business : String , termsandconditions : String , pimage : String });


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/liked-post', (req, res) => {
      let postId = req.body.postId;
      let userId = req.body.userId;
      Users.updateOne({ _id: userId }, { $addToSet: {likedPost: postId  } }) 
      .then(() => { 
          res.send({ message: 'liked success.' })

      })   
      .catch(() => {
          res.send({ message: 'server err' })
       })
})

app.post('/add-post', upload.single('pimage') , (req, res) => {
  const business_name = req.body.business_name;
  const business_owner_name = req.body.business_owner_name;
  const business_id = req.body.business_id;
  const category = req.body.category;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const required_funding = req.body.required_funding;
  const total_funding = req.body.total_funding;
  const about_business = req.body.about_business;
  const termsandconditions = req.body.termsandconditions;
  const pimage = req.file.path;




  const post = new Post({ business_name , business_owner_name , business_id , category , address  , phone_number , required_funding  , total_funding , about_business , termsandconditions  , pimage});

  post.save()
         .then(() => {

             res.send({message: 'Saved Success '})
         })
         .catch(()=> {

             res.send({message: 'Server err'})
         })

})


app.get('/get-post' , (req , res) => {
  Post.find()
  .then((result)=>{
   
    res.send({message: 'success' , post : result});
  })
  .catch((err) => {
    res.send({message: 'Server err'})
  })
})



app.post('/liked-post' , (req , res) => {

  Users.findOne({ _id : req.body.userId}).populate('likedPost')
  .then((result)=>{
    res.send({message: 'success' , post : result.likedPost});
  })
  .catch((err) => {
    res.send({message: 'Server err'})
  })

})


app.post('/signup', (req, res)=> {

 

  const username = req.body.username;
  const password = req.body.password;


  const user = new Users({ username : username, password:password});

  user.save()
         .then(() => {

             res.send({message: 'Saved Success '})
         })
         .catch(()=> {

             res.send({message: 'Server err'})
         })
    

});





app.post('/login', (req, res)=> {

 

  const username = req.body.username;
  const password = req.body.password;


 Users.findOne({username : username})

         .then((result) => {
            

             if(!result){
              res.send({message: 'User Not Found '})
             }

             else{

               if(result.password == password){
                     const token = jwt.sign({
                      data: result
                    }, 'MYKEY', { expiresIn: '1h'});

                     res.send({message: 'Find Success ' , token : token , userId: result._id})
               }

               if(result.password != password){
                     res.send({message: 'Wrong Password'})
               }
             }
         })
         .catch(()=> {
             res.send({message: 'Server err'})
         })
    

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})