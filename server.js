"use strict"

const Hapi = require('hapi');
const config = require('./config');
const mongoose = require('mongoose');
const server = new Hapi.Server();

require('./models/Users');

mongoose.connect('mongodb://localhost:27017/'+config.dbName,{
    useMongoClient: true
},()=>console.log("Database connected !"));

server.connection({
    host: config.host,
    port: config.port
});

let indexRoutes = require("./routes/index");
server.register(require('inert'),(err)=>{
    if(err){
        throw err;
    }
    server.route(indexRoutes);
    
    server.start((err)=> {
        if(err){
            throw err;
        }
        console.log("server running at : ", config.port);
    });

    

})
