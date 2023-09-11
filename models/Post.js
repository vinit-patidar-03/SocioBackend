const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref : 'User',
         required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    likes:[{type: mongoose.Schema.Types.ObjectId, ref : "User"}],
    photo:{
        type:String,
        default: 'No Photos',
        required:true
    },
    // likes:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    timestamp:{
        type: Date,
        default: Date.now
    }
    
})

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;