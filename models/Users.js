const mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
    fullname:{type: String , lowercase: true},
    description: {type: String},
    imageUrl: {type: String},
    smallImgUrl: {type: String} 
})

mongoose.model('User',UserSchema);
