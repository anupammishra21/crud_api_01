const mongoose = require('mongoose')

const schemae = mongoose.Schema({
    name:{type:String,require:true},
    age:{type:String,require:true},
    email:{type:String,require:true},
    sex:{type:String,require:true},
    image:{type:String,require:true},
    isDeleted:{type:Boolean,enum:[true,false],default:false}

},{
    timestamps:true,
    versionKey:false

})

module.exports = mongoose.model("crudApi",schemae)