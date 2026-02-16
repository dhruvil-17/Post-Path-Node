const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

const SecretKey = "JohnWick";


app.get('/', (req,res) => {
    jwt.sign({name : "John Wick"}, SecretKey, (err, token) => {
        if(err){
            res.send("Error in generating token");
        }else{
            res.cookie("token", token, {httpOnly : true}).send("Token generated and stored in cookie");
        }
    });
})

app.use((req,res,next) => {
    const token = req.cookies.token;
    if(!token){

       return res.status(401).send("Unauthorized");
    }else{
        jwt.verify(token, SecretKey, (err, decoded) => {
            if(err){
               return res.status(401).send("Unauthorized");
            }else{
                req.user = decoded;
                next();
            }
        });
    }
})

app.get('/dashboard', (req,res) => {
    res.send(`Welcome to the dashboard, ${req.user.name}`);
})          
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})