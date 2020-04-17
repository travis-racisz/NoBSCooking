const express = require('express')
const Save = express.Router()
const Users = require('../models/Users.js')


// updates user with new recipe Id
Save.put("/:recipeId", (req, res, next) => { 
    Users.findOneAndUpdate({_id: req.user._id},
            {$push:{recipes: req.params.recipeId}}, 
            {new: true}, 
            (err, updatedUser) => { 
                if(err){ 
                    res.status(500)
                    return next(err)
                } else { 
                    return res.status(200).send(updatedUser)
                }
            }
            
            )
    })

// remove recipe from users array 

Save.put('/delete/:id', (req, res, next) => { 
    Users.findOneAndUpdate({_id: req.user._id}, 
        {$pullAll:{recipes: [req.params.id]}}, 
        {new: true}, 
        (err, updatedUser) => { 
            if(err){ 
                res.status(500)
                return next(err)
            } else { 
                return res.status(200).send(updatedUser)
            }
        })
})


// gets user information by username .... prossibly pointless need to revisit 
    Save.get('/:username', (req, res, next) => { 
        Users.findOne({username: req.params.username}, (err, user) => { 
            if(err){ 
                res.status(500)
                return next(err)
            } else { 
                return res.status(200).send(user)
            }
        })
    })


module.exports = Save
