const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/schema');
const cors = require('cors');

const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions={
    origin:'http://localhost:3000',
    methods : ['GET','POST'],
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.get('/' , (req,res)=>{

   res.send("Home Page")
})

app.get('/users' , async (req,res)=>{
    const users = await User.find();
    res.json(users);

})

app.post('/users' , async (req,res)=>{
    const {name , email} = req.body;
    const user = new User({ name , email});
    await user.save();
    res.json(user)
})

app.post('/users/:id' , async (req,res)=>{
    const {id} = req.params;
    const {name , email} = req.body;
    const user = await User.findByIdAndUpdate(id , {name , email} , {new:true});
    res.json(user)
})

mongoose.connect('mongodb://localhost:27017/Practice')
  .then(() => console.log('Connected to MongoDB'))

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})