const mongoose = require('mongoose');
const { Schema } = mongoose;

//UserSchema for storing user data
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: Number,
            default: 0
        },
        bio: {
            type: String,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        followings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        timestamp: {
            type: Date,
            default: Date.now
        }

    });

const User = mongoose.model('User', UserSchema);
module.exports = User;