const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const {validatePassword} = require("../services/auth.service");
const authModel = require("../models/auth.model");

const  customFields = {
    usernameField : "email",
    passwordField : "password",

}

const verifyCallBack = async (username , password , done) => {
    
 
    const user = await authModel.findOne({email : `${username}`})
   
   
    if(!user) {
        return done(null , false)
    }

    const hashTrue = validatePassword(password ,user.hash,user.salt   )

    if(hashTrue){
        return done(null , user)
    }else {
        return done(null , false)
    }
    
}

const strategy = new localStrategy(customFields , verifyCallBack)

passport.use(strategy);

passport.serializeUser((user , done) => {
    done(null, user.id)

})

passport.deserializeUser((userId, done) =>{

    authModel.findById(userId)
    .then((user) => {
        done(null , user)
    })
    .catch((err) => {
       done(err)
    })

})






















