'use strict'
const fs = require('fs');
const {readFile, writeFile, hash, checkExists} = require('./utility')
const {saveLogin} = require('./saveLogin');

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
            console.log("Error: Problem reading file!")
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
                console.log("Error: Problem hashing the passwords!")
            }
        }

        // check if encrypted file exists
        outputFileExists = checkExists(passwordEncFileName);

        if (outputFileExists === 'Found') {
            console.log("Error: Output file already exists!")
        } else {
            // file not found, we can write it.
           try {
               // write encrypted out to file.
               writeFile(outputValues, passwordEncFileName);
               console.log("Success: File wrote successfully!")

               try{
                   const results = saveLogin(outputValues)
                   console.log("Results saving to mongodb: ")
                   console.log(results)
               } catch (err) {
                   console.log("Error: Problem with saving to MongoDB: ", err)
               }

           } catch {
               console.log("Error: Failed to write to ", passwordFileName);
           }
        }

    } else {
        console.log( "No file to read. Please try running the program gain.")
    }
}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = {makepassword};