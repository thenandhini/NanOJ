
//model for users
const mongoose=require('mongoose'); 


//user schema 
const userSchema= new mongoose.Schema(
    {
        //firstname,lastname,email,password
        firstname:{
            type: String,
            required: true


        },
        lastname:{
            type: String,
            required: true
            

        },
        email:{
            type: String,
            required: true,
            //establish to be unique
            unique:true
            

        },
        password:{
            type: String,
            required: true

        }

        
    }
);
//export
  module.exports=mongoose.model('User',userSchema);
