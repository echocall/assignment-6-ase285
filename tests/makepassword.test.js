// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const p = require('../src/makepassword');
const { readFile, writeFile, hash, checkExists} = require('./utility')
const fs = require('fs');

/*
// Let's say you have a toHash() function in this module

test('Check toHash(): if the email:password is converted into email:hashPassword', () => {
    const input = ???
    const output = ???
    expect(p.toHash(input)).toBe(output);
});
*/

describe("makepassword should create file", () => {
    test('',() => {
        const fileName = './tests/passwordtest.txt'
        const encFileName = './tests/passwordtest.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        let testPassExists = ''
        let testEncExists = ''

        testPassExists = checkExists(fileName)
        console.log("Does " + fileName + " exist before running makepassword?")
        console.log(testPassExists)
        
        p.makepassword(fileName, encFileName)

        // 2. Make sure password.enc.txt does exist after running the function.
        console.log("Does " + encFileName + " exist after running makepassword?")
        testEncExists = checkExists(encFileName)
        console.log(testEncExists)
        // 3. Make sure the contents of password.enc.txt has correct contents.

    })
})