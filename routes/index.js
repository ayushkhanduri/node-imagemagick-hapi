const fs = require('fs');
const path = require('path');
const factoryData = require('../factoryData');
const imageMagic = require('../imagemagick');
const mongoose = require('mongoose');

let User = mongoose.model('User');

let allRoutes = [ 
    {
        method: "GET",
        path: "/js/{file*}",
        handler: {
            directory: {
                path: "build/client"
            }
        }
    },
    {
        method: "GET",
        path: "/static/images/{file*}",
        handler: {
            directory: {
                path: "public/images"
            }
        }
    },
    {
        method: "GET",
        path: "/images/{file*}",
        handler: {
            directory:{
                path: "uploads"
            }
        }

    },
    {
        method: "GET",
        path: "/",
        handler: function(request,reply){
            User.findOne({},(err,result)=>{
                if(err)
                    throw err;
                if(!result){
                    let newUser= new User();
                    newUser.fullname=  "Ayush Khanduri";
                    newUser.description = "Full time teacher";
                    newUser.imageUrl= "";
                    newUser.smallImgUrl= "";
                    newUser.save((err)=>{
                        if(err)
                            throw err
                        reply.file('./views/index.html');
                    })
                }else{
                    reply.file('./views/index.html');
                }
            })
            
        }
    },
    {
        method: "GET",
        path: "/savedImages",
        handler: function(request,reply){
            User.findOne({},(err,result)=> {
                if(err)
                    throw err;
                console.log(result);
                reply(result);
            })
        }

    },
    {
        method: "POST",
        path: "/logoUpload",
        config: {
            payload:{
                maxBytes: 2097152,
                parse: true,
                output: 'stream',
                allow: "multipart/form-data"
            },
            handler: function(request,reply){
                var payload = request.payload;
                if(payload){
                    var name = factoryData.addRandomString() + payload.data.hapi.filename  ;
                    var path =__dirname + "/../uploads/"+ name;
                    var file = fs.createWriteStream(path);
                    file.on('error', (err)=>{
                        console.log(err);
                    })

                    fs.writeFile(path,payload.data._data,'binary',(err)=>{
                        if(err)
                            reply(JSON.stringify(err));
                        console.log("level 1");
                        var propArr = ['-blend','100%','-gravity','SouthEast','./public/images/logo.png','./uploads/'+name,"./uploads/"+name];
                        imageMagic.composite(propArr,(err,stdout,stderr)=>{
                            if(err)
                                reply(JSON.stringify(err));
                            console.log("level 2");
                            let options = {
                                width : factoryData.width,
                                height: factoryData.height,
                                srcPath: "./uploads/" + name,
                                dstPath: "./uploads/" + name + "_" + factoryData.smallImgName()
                            }
                            imageMagic.resize(options,(err)=>{
                                if(err){
                                    reply(JSON.stringify(err));
                                }
                                console.log("level 3");
                                User.findOne({},(err,user)=>{
                                    let ret = {
                                        bigUrl: "http://" + request.headers.host + "/images/" + name ,
                                        smallUrl: "http://" + request.headers.host + "/images/" + name + "_" + factoryData.smallImgName()
                                    }
                                    user.imageUrl = ret.bigUrl;
                                    user.smallImgUrl = ret.smallUrl;
                                    user.save((err)=>{
                                        if(err)
                                            reply(JSON.stringify(err));
                                        console.log("user saved");
                                        reply(JSON.stringify(ret));
                                    });
                                });
                            })

                        })
                    })
                }

            }

        }
        

    }
];
module.exports = allRoutes;  