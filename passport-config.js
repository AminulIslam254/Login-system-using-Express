const localstrat = require("passport-local").Strategy;
const bcrypt=require('bcrypt');


const autenticateuserfun1 =async  (email,password,done)=>{
    const user=getUserByEmail(email);
    if(user==null)
    {
        return done(null,false,{message:"no user found"});
    }
    try{
            if(await bcrypt.compare(password,user.password))
            {
                return done(null,user);
            }
            else
            {
                return done(null,false,{message:"Password did not match"});
            }
    }catch(e){
            return done(e);
    }
}

function initialize(passport,getUserByEmail,getUserById){
    passport.use(new localstrat({usernameField :'email'},autenticateuserfun1));
    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id));
    })
}

module.exports = initialize;