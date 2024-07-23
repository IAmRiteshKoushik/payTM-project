import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:21017/paytm");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        requried: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
});

export const User = mongoose.model('User', userSchema);
export const Account = mongoose.model("Account", accountSchema);
