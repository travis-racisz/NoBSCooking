const express = require('express')
const Auth = express.Router()
const Users = require('/Users/travisracisz/dev/assignments/busybs/models/Users.js')
const jwt = require('jsonwebtoken')


Auth.post("/login", (req, res, next) => { 
    Users.findOne({username: req.body.username.toLowerCase()}, (err, user) => { 
        if(err){ 
            res.status(500)
            return next(err)
        } else if(!user){ 
            res.status(403)
            return next(new Error("Username or Password is incorrect"))
        }
        user.isMatch(req.body.password, (err, isMatch) => { 
            if(err){ 
                res.status(403)
                return next(err)
            } 
            if(!isMatch){ 
                res.status(403)
                return next(new Error("Username or Password is incorrect"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            res.status(200).send({token, user: user.withoutPassword()})
        })
    })
})

Auth.post("/signup", (req, res, next) => { 
    Users.findOne({username: req.body.username.toLowerCase()}, (err, user) => { 
        if(err){ 
            res.status(500)
            return next(err)
        }
        if(user){ 
            res.status(403)
            return next(new Error("Username is already taken"))
        } 
        const newUser = new Users(req.body)
        newUser.save((err, savedUser) => { 
            if(err) {
            res.status(500)
            return next(err)
        } 
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        res.status(200).send({token, user: savedUser.withoutPassword()})
    })
        
    })
})




module.exports = Auth
