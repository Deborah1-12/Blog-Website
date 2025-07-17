import mongoose from "mongoose";
import isEmail  from "validator/lib/isEmail.js";
import bcrypt from "bcrypt"; 
import { type } from "os";
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        default: null,
        minlength: [5, 'Password must be at least 5 characters long']
    },
    googleId: {
        type: String, // Save this only if the user signs in with Google
    },
    googleThumbnail: {
        type: String,
    }
});

//hashing pw before saving to db
userSchema.pre('save', async function (next) {
  // Only hash if password is present and modified
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//static method before user is logged in
userSchema.statics.login = async function(username, password) {
    //checks for username in the db collection 
    const user = await this.findOne({username});
    //checking if user exists
    if (user) {
       //if user exists, compares pw in the db
       const auth = await bcrypt.compare(password, user.password);
       //checking if the comparison is completed
       if (auth) {
            return user;
       }
       throw Error ('Incorrect Password');
    }
    throw Error ('Incorrect Username');
}
const User = mongoose.model('User', userSchema);
export default User;

/* when comparing password using bcrypt.compare, it takes in 2 arguments i.e the new password inputted and the prev pw */