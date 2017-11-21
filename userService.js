'use strict'

const fs = require('fs')
/**
 * Array of User objects
 */
const dbUsers = require('../data/usersDb.json')

module.exports = {
    'findUser': findUser,
    'authenticate': authenticate,
    'save': save
}

// Find user in the users database (dbUsers)
function findUser(username, cb) {
    const user = dbUsers.find(item => item.username == username)
    cb(null, user)
}

// Check if the user exists and if password is right
function authenticate(username, password, cb) {
    findUser(username, cb)
    if(!user) return cb(null, null, 'User ${username} does not exists')
    if(password != user.password) return cb(null, null, 'Invalid password')
    cb(null, user)
}

// Save the user database
function save() {
    fs.writeFile('./data/usersDb.json', JSON.stringify(dbUsers))
}