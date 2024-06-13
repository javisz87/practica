const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const userService = require('../models/user.model').userModel; 

const initializePassport = () => {
    passport.use(
        'github',
        new GitHubStrategy(
        {
            clientID: 'Iv1.9b4b6069c15a0ab7',
            clientSecret: '82cdef2604bf5c8e1ae930f832a46046bf2ae7d6',
            callbackURL: 'http://localhost:8080/api/session/githubcallback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile)
            
                let user = await userService.findOne({ email: profile._json.email });
                if (!user) {
                    let newUser = {
                        nombre: profile._json.name,
                        apellido: '',
                        edad: 18,
                        email: profile._json.email,
                        pass: '', 
                    };
                    let result = await userService.create(newUser);
                    done(null, result);
                } else {
                    done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    });
    
    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });
    
};

module.exports = initializePassport;
