
## NoBSCooking - Recipes without the BS 
simple recipe site made using React.js, Node.js, Mongoose, and Express 

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)

### Technologies 
* React: 16.13.1
* Mongoose: 5.9.7 
* bcrypt: 5.0.0
* dotenv: 8.2.0
* Express": 4.17.1
* Express-jwt: 6.0.0
* JSONwebtoken: 8.5.1
* Morgan: 1.10.0

## Setup 
there are two environment variables that need to be set: 
secret and a mongod uri connection string. 

inside of the project after you git clone it, you want to create a .env file in the root folder. <br /> 
create a value called secret:"any string you want" the value of it can be any string you want. <br /> 
next you want to set up mongodb on your machine and create another variable inside of the .env file called MONGODB_URI:"connection string to DB" 
instructions on how to do that can be found here [https://docs.mongodb.com/manual/installation/]

To run this project, clone the repository locally: <br />
run these commands 
``` 
npm i 
cd client 
npm i 
cd .. 
nodemon server.js

```

Create a second terminal and from the second terminal run 

```
cd client 
npm start

```
## Usage
after npm start open localhost:3000 in your local broswer to use the app 
