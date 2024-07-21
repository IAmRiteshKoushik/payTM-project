const mongoose = require('mongoose');

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: string,
    password: string,
    firstName: string,
    lastName: string,
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
