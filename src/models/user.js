const mongoose = require("mongoose");
const validator = require("validator");


const User = mongoose.model("User", {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
     
    },  email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
      password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
  
          if (value.toLowerCase().includes("password")){
            throw new Error('password must be longer than 6 characters and must not contain "password"')
          }
  
          
        },
        trim: true,
     
      }
  });