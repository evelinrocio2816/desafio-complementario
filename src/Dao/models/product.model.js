const mongoose= require("mongoose")

const ProductSchema =new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type:String,
    },
    code:{
        type:String,
        unique: true,
        required: true
    },
 stock:{
    type:Number,
    required:true
 },
 category:{
    type:String,
    required: true 
 },
 status:{
    type:Boolean,
    required: true
 },
})
const ProductModels = mongoose.model("products", ProductSchema)
 
module.exports= ProductModels;