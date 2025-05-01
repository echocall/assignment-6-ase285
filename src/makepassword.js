'use strict'
const fs = require('fs');
const {readFile, writeFile, hash, checkExists} = require('./utility')

function makepassword(passwordFileName, passwordEncFileName) {
    // read file in. File will be returned as an array of lines.
    let inputValues = [];
    let outputValues = [];
    let inputFileExists = ''
    let outputFileExists = ''

    inputFileExists = checkExists(passwordFileName);

    console.log("File status: " + inputFileExists);
    if (inputFileExists === 'Found'){
        try{
            inputValues = readFile(passwordFileName)
        } catch {
            console.log("Error reading file!")
        }

        // split the data further on the : to get passwords and convert them.
        inputValues.forEach(encodePassword)

        // Convert passwords to encrypted, call Hash in utility.
        // Declared here for scoping.
        function encodePassword(item) {
            let encodedPassword = '';
            let splitArray = [];

            // splitting original item to get the password
            splitArray = item.split(":");
            try {
                // encoding the password
                encodedPassword = hash(splitArray[1]);

                // Writing the values to the output array
                outputValues.push(splitArray[0] + ":" + encodedPassword)

            } catch {
                console.log("Error hashing the passwords!")
            }
        }

        // check if encrypted file exists
        outputFileExists = checkExists(passwordFileName);

        if (outputFileExists === 'Found') {
            try {

            } catch {

            }
        } else {
            // file not found, we can write it.
           try {
               // write encrypted out to file.
               writeFile(outputValues, passwordEncFileName);
           } catch {
               console.log("Error writing to " + passwordFileName);
           }
        }

    } else {
        console.log( "No file to read. Please try running the program gain.")
    }
}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = makepassword;