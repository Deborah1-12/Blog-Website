import User from '../models/user.js';
import passport from 'passport';
import { createToken, maxAge } from '../config/jwtConfig.js';
import { handleErrors} from '../utils/handleErrors.js';

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
      
    res.redirect('/');
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).render('signup', { title: "Signup", errors });
    }
  }
export const Logout = (req, res) => {
  //logging a user out, you need to replace the jwt with a blank one with a short age
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
 }
 
 // OAuth routes
 export const googleAuth = (passport.authenticate('google',{
  scope: ['profile', 'email']
 }));

  export const googleRedirect = [
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;

    // create JWT
    const token = createToken(user._id);
    res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
    });
    res.redirect('/');
  }
];
