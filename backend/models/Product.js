const mongoose = require("mongoose");

const ProductSchema =new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
            trim: true
        },
        price:{
   type: Number,
   require: true,
   min: 0
        },
        image: {
            type: String,
            required:true,
            trim: true
        }
    },
    {timestamps: true}
)
module.exports = mongoose.model("Product", ProductSchema)