const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require(`morgan`)
const expressJWT = require('express-jwt')
require("dotenv").config()



mongoose.connect("mongodb://localhost:27017/busybs",{ 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true, 
    useFindAndModify:false,
}, () => console.log("Database is connected"))

app.use(express.json())
app.use(morgan(`dev`))

app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressJWT({secret: process.env.SECRET}))
app.use("/api/save", require("./routes/saveRouter.js"))



app.use((err, req, res, next) => {
    console.log(err.message)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(9000, () => { 
    console.log(`server is running on port 9000 `)
})