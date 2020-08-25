const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require(`morgan`)
const expressJWT = require('express-jwt')
require("dotenv").config()
const path = require("path")

const port = process.env.PORT || 9000;


app.use(express.json())
app.use(morgan(`dev`))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI,{ 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true, 
    useFindAndModify:false,
}, () => console.log('db is connected'))


app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressJWT({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use("/api/save", require("./routes/saveRouter.js"))



app.use((err, req, res, next) => {
    console.log(err.message)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => { 
    console.log(`server is running`)
})