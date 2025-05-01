'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility')

function makepassword(passwordFileName, passwordEncFileName) {
    // read file in. File will be returned as an array of lines.
    let inputValues = [];
    let outputValues = [];
    
    inputValues = readFile(passwordFileName)
    console.log(inputValues)

    // split the data further on the : to get passwords and convert them.
    inputValues.forEach(encodePassword)
    
    // Convert passwords to encrypted, call Hash in utility.
    function encodePassword(item) {
        let encodedPassword = '';
        let splitArray = [];
        
        // splitting original item to get the password
        splitArray = item.split(":");
        
        // encoding the password
        encodedPassword = hash(splitArray[1]);

        // Writing the values to the output array
        outputValues.push(splitArray[0] + ":" + encodedPassword)
    }
    console.log(outputValues)

    // write encrypted out to file.
    writeFile(outputValues, passwordEncFileName);

    // write encrypted data to mongoDB
    

}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = makepassword;