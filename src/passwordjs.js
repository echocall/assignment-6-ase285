'use strict'
const fs = require('fs');
const makePassword = require('.makepassword')
const {hash, readFile} = require("./utility");

function passwordjs() {
    if (process.argv.length !== 5) return 'false';

    var filename = process.argv[2]
    var email = process.argv[3]
    var password = process.argv[4]

    var hashedPassword = ''
    var emailPassword = ''
    let encValues = []
    let indexFound = -1;
    let foundResult = false;

    // take password and hash it
    hashedPassword = hash(password);

    // compare email and password to data within the password.enc.txt file
    emailPassword = email + ":" + hashedPassword;
    encValues = readFile('password.enc.txt')
    indexFound = encValues.indexOf(emailPassword);

    // return comparison result
    foundResult = indexFound !== -1;
    console.log(foundResult)
}

if (require.main === module) {
    console.log(passwordjs()) // print out true or false
}

module.exports = passwordjs;