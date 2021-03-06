"use strict"

const Hapi = require('hapi');
const config = require('./config');
const mongoose = require('mongoose');
const server = new Hapi.Server();

require('./models/Users');

const dbUrl = config.getDbUrl();
mongoose.connect(dbUrl,{
    useMongoClient: true
},()=>console.log("Database connected !"));

server.connection({
    port: ~~process.env.PORT || config.port // because in hapi the port is given as number 
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
        console.log("server running at : ",process.env.PORT || config.port);
    });

    

})
