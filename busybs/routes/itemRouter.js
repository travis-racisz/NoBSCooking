const express = require('express')
const itemRouter = express.Router()
const Items = require("../models/Items")


itemRouter.get("/", (req, res, next) => { 
    Items.find((err, Item) => { 
        if(err){ 
            res.status(500)
            return next(err)
        } 
        return res.status(200).send(Item)
    })
})

itemRouter.post("/" , (req, res, next) => { 
    const newItem = new Items(req.body)
    newItem.save((err, savedItem) => { 
        if(err) {
            res.status(500)
            return next(err)
        } else { 
            return res.status(200).send(savedItem)
        }
    })

})

itemRouter.put("/:itemId", (req, res, next) => { 
    Items.findOneAndUpdate({_id: req.params.itemId}, req.body, (err, updatedPost) => { 
        if(err){ 
            res.status(500)
            return next(err)
        } else { 
            return res.status(201).send(updatedPost)
        }
    } )
})


itemRouter.delete("/:itemId", (req, res, next) => { 
    Items.findOneAndDelete({_id: req.params.itemId}, (err, deletedPost) => { 
        if(err){ 
            res.status(500)
            return next(err)
        } else { 
            return res.status(200).send(`succesfully deleted ${deletedPost.title}`)
        }
    })
})
module.exports = itemRouter