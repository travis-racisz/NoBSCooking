const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const Users = new Schema({                
    username: {
        type: String, 
        required: true,
    }, 
    password: { 
        type: String, 
        required: true, 
    }, 
    isAdmin: { 
        type: Boolean, 
        default: false
    }, 
    dateCreated: { 
        type: Date, 
        default: Date.now
    }, 
    recipes: { 
        type: Array, 
    }
})

Users.pre("save", function(next){ 
    const user = this
    if(!user.isModified("password")){ 
        return next()
    } else { 
        bcrypt.hash(user.password, 10, (err, hash) => { 
            if(err){ 
                return next(err)
            } else { 
                user.password = hash
                next()
            }
        })
    }
})

Users.methods.isMatch = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if(err) return callback(err)
      return callback(null, isMatch)
    })
  }

Users.methods.withoutPassword = function(){ 
    user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("Users", Users)