const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Items = new Schema({ 
    title: { 
        type: String, 
        required: true, 
    }, 
    imgUrl: { 
        type: String, 
        requied: true, 
    }, 
    price: {
        type: Number,
        requied: true,
    },
    qty: {
        type: Number, 
        requied: false
    }

})

module.exports = mongoose.model("Items", Items)