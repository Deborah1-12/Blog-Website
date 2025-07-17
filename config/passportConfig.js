import passport, { Passport } from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user already exists in th db
      console.log(profile);
      
      User.findOne({ email: profile.emails[0].value }).then((user) => {
            if (user) {
            // If the user exists (either from email/password or Google before)
            console.log("User already exists:", user);

            // Optional: Update googleID if not already set
            if (!user.googleID) {
                user.googleID = profile.id;
                user.save().then((updatedUser) => {
                console.log("Google ID added to existing user:", updatedUser);
                });
            }
            done(null, user);
            } else {
            //saves new user to the db if user is not found
            new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleID: profile.id,
                googleThumbnail: profile.photos[0].value,
            })
                .save()
                .then((newUser) => {
                console.log("new user created:" + newUser);
                done(null, newUser);
                });
            }
        });
    }
  ));
