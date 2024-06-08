const userAuth = require("../models/auth.model");
const {generateHashAndSalt} = require("../services/auth.service")

function showLogInPage(req , res){
     res.render("login")
}


function showSignUpPage(req , res){
    res.render("signup")
}

function handleLogIn(req , res){
     res.redirect("/chess/lobby")

}

async function handleSignUp(req , res){
    console.log( req.body.email)
    const userPresent = await userAuth.find({email: req.body.email})
    console.log(userPresent)
    if(userPresent === null){
        res.render("signup" , {error: "This user already exist"})
    }else {
        console.log("hello world")
    const hashAndSalt = generateHashAndSalt(req.body.password)
    console.log("hello world")
    const user = await userAuth.create({
        userName: req.body.name,
        email: req.body.email,
        hash: hashAndSalt.hash, 
        salt: hashAndSalt.salt
    })

    res.redirect("/auth/login")

}
}

async function logout(req, res) {
    
    const userPresent = await userAuth.findByIdAndUpdate(req.user._id, {Online: false}, {new: true})
    req.logout()

    res.redirect("/auth/login")
}

async function isAuthenticated(req, res , next) {
  
   if(req.isAuthenticated()) {
    
    const userPresent = await userAuth.findByIdAndUpdate(req.user._id, {Online: true}, {new: true})
    
   
    next()
   }else {
    res.redirect("/auth/signup")
   }
}



module.exports = {showLogInPage , showSignUpPage , handleLogIn , handleSignUp , isAuthenticated , logout};