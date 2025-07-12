import User from '../models/user.js';
import jwt from 'jsonwebtoken'

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', username: '', password: ''};
    //incorrect username
    if (err.message === 'Incorrect Username'){
      errors.username = 'Username not registered'
    }

    //incorrect password
    if (err.message === 'Incorrect Password'){
      errors.password = 'Incorrect Password'
    }

    //duplicate error code 
    if (err.code === 11000){
      errors.email = 'Email has already been used';
      errors.username = 'Username has already been used';
      return errors;
    }
    //validation errors
    if (err.message.includes('User validation failed')){
      Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
      })
    }
    return errors;
  }

//jwt
const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: maxAge
    });
}
export const getLogin = (req, res) => {
  res.render('login', { title: "Login", errors: {}   });
};

export const postLogin =  async (req, res) => {
  const {username, password} = req.body;
  console.log(req.body);
  try {
    const user = await User.login(username, password);
    req.session.username = username;
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
    res.redirect('/');
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).render('login', { title: "Login", errors });
  }
};

export const getSignup =  (req, res) => {
  res.render('signup', { title: "Signup", errors: {}  });
};

export const postSignup = async (req, res) => {
    // const username = req.body.username;
    const {email, username, password} = req.body;
    //creating a new user based on the user model
    try {
      //creates user and saves it to the database
     const newUser = await User.create ({email, username, password});
     const token = createToken(newUser._id);
     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
     req.session.username = newUser.username;
      
    res.redirect('/');
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).render('signup', { title: "Signup", errors });
    }
  }

 /*  jwt.sign() is a method to sign the jwt 
 it takes in 3 arguments. one is the id in an object form and the other is a secret the payload will be hashed with this 2 to create the signature the third one is the options {} that carries the max age and stuff*/
