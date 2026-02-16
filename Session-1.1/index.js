const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/schema');
const bodyParser = require('body-parser');
const path = require('path');


const app= express();

app.get('/' , (req,res)=>{

   res.send("Home Page")
})

app.get('/users' , (req,res)=>{
    const users = User.find();
    res.json(users);

})

app.post('/users' , (req,res)=>{
    const {name , email} = req.body;
    const user = new User({ name , email});
    user.save();
    res.json(user)
})

mongoose.connect('mongodb://localhost:27017/Practice')
  .then(() => console.log('Connected to MongoDB'))

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})