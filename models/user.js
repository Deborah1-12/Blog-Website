import mongoose from "mongoose";
import isEmail  from "validator/lib/isEmail.js";
import bcrypt from "bcrypt"; 
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
        required: [true, 'Password is required'],
        minlength: [5, 'Password must be at least 5 characters long']
    }
});
//hashing pw before saving to db

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});
const User = mongoose.model('User', userSchema);
export default User;