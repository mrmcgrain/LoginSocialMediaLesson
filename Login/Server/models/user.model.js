const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {

        first: String,

        last: String,

        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            unique: true,
        },
        isOnline: Boolean,
        token: String,

        friends: [{
            username: String,
            first: String,
            last: String,
            _id: mongoose.Schema.Types.ObjectId,
            status: String, 
            created: Date
        }],

        bio: String,
        highSchool: String,
        city: String,
        state: String,
        employment: String,
        relationshipStatus: String,
        gender: String,
        age: String,
        // NEW for img upload
        profileImg: String, // new for img upload
    }
)
const User = mongoose.model("User", UserSchema);
module.exports = User;