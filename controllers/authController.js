import User from '../models/user.js';


//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', username: '', password: ''};

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
export const getLogin = (req, res) => {
  res.render('login', { title: "Login" });
};

export const postLogin =  async (req, res) => {
    const username = req.body.username;
    req.session.username = username;
    res.redirect('/');
};

export const getSignup =  (req, res) => {
  res.render('signup', { title: "Signup" });
};

export const postSignup = async (req, res) => {
    // const username = req.body.username;
    const {email, username, password} = req.body;
    //creating a new user based on the user model
    try {
      //creates user and saves it to the database
     const newUser = await User.create ({email, username, password});
     req.session.username = newUser.username;

    res.redirect('/');
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({errors})
    }
  }