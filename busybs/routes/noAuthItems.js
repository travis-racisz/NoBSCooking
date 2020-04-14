const express = require('express')
const noAuthItems = express.Router()
const Items = require("../models/Items")


noAuthItems.get("/items", (req, res, next) => { 
    Items.find((err, Item) => { 
        if(err){ 
            res.status(500)
            return next(err)
        } 
        return res.status(200).send(Item)
    })
})


module.exports = noAuthItems