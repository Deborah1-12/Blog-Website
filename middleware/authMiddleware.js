import jwt from 'jsonwebtoken'; //used to validate the jwt
import User from '../models/user.js'
//middleware for any route that requires authentication
export const requireAuth = (req, res, next) => {
    //grab token from the cookies
    const token  = req.cookies.jwt;

    //check if json web token exists and is verified
    if (token) {
        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        //if token doesn't exist and it isn't valid, redirect to login route
        res.redirect('/login')
    }
}

//check current user
export const checkUser = (req, res, next) => {
    const token  = req.cookies.jwt;
    //check if json web token exists and is verified
    if (token) {
        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                //making data accessible so it can be injected in the views using locals in the response
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}