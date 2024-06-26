import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }

});

export const MovieModel = mongoose.model("Movie", movieSchema);