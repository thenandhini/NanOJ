
//import express

const express=require('express');

const app=express();//initialise express



const {DBConnection}=require('./database/db');//see if connection is established or not
const User=require('./models/Users.js')
require('dotenv').config();

const bcrypt=require('bcryptjs');//bcrypt 
const jwt=require('jsonwebtoken');//webtoken 
const cookieParser=require('cookie-parser');//import cookie parser


const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // URL of your React app
    credentials: true,
}));


//mildwares
app.use(express.json()); //to convert data into json format
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));




DBConnection(); 


app.get("/",(req,res)=>{
    console.log('Cookies:',req.cookies);
    res.send("Welcome Hayagreevar!");



});


app.post("/signup",async (req,res)=>
{

    console.log(req);
   try {
    //receive all the data from req body
    const {firstname,lastname,email,password}=req.body;

    //make sure all the fields are filled
    if(!(firstname && lastname && email && password ))
    {
       return res.send("Please enter all the fields!");
    }

    //check if already registered-->database connection 
    const existingUser= await User.findOne({email});
    if(existingUser)
    {
        return res.send("User already exist!");
    }   


    //encrypt the password using bcrypt
    const hashPassword = bcrypt.hashSync(password,18);
    console.log(hashPassword);

    //store the data in database
    const user= await User.create(
        {
            firstname,
            lastname,
            email,
            password:hashPassword,


        }
    );

    //print in the console
    console.log(user);

    //give token to the user
    const token=jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
        expiresIn: "1h"
    });

    user.token=token;   
    user.password=undefined;

    //send response
    res.status(201).json({
        message:"You hav successfully registered!",
        user

    });    
} 
   catch (error) {
    console.error(error);
    }
});

app.post("/login",async (req,res)=>
{   
    //get all the data from the req body
    const {email,password}=req.body;
     //see if all the fields are present
     if(!( email && password ))
        {
           return res.send("Please enter all the fields!");
        }
try
{       
    //check if user exists already
    const user= await User.findOne({email});
    if(!user)
    {
        return res.send("User does not exist!");
    }  
       
    //check if the password matches

    const validPassword= await bcrypt.compare(password,user.password)  //M1
  
    if(!validPassword)
    {
        return res.status(401).send("Incorrect password,kindly enter the correct password");

    }
    

    //give token to the user
    const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{ //removed email
        expiresIn: "1h"
    });
    
    
    user.token=token; 
    user.password=undefined;

    //store cookie - cookie parser
     const options={
        expires: new Date(Date.now()+24*60*60*1000), 
        httpOnly:true,

     };

  
    // return res.send("Logged in successfully");
    res.status(200).cookie("token", token, options).json({
        message: "You have successfully logged in",
        success: true,
        token,
    });

    
}
catch(error){
    console.log(error);
    res.send("error");
    }

}); 
//define where the server would run

app.listen(8000,()=>{
    console.log("Server is listening on route 8000");
});
