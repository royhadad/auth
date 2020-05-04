const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    addUser: async (email, password) => {
        //if email exists - returns error status 409 (conflict)
        //else adds the user and returns a newly generated auth token
    },
    findUserByCredentials: async (email, password) => {
        //returns the user object if found, if not returns undefined
    },
    generateAuthToken: async (userId) => {
        //generates a new jwt token, stores the token for user with id=${userId} and returns the token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7 days' });

        //set user tiken in DB
        return token;
    },
    removeAuthToken: async (userId) => {
        //removes the user's auth token
        //throws an error if something went wrong
    },
    findUserById: async (userId) => {
        //returns the user if found or undefined if not
    },
    findUserByIdAndToken: async (userId, token) => {
        //validates the token, returns the user if found or undefined if not
    }
}