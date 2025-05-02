// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const {makepassword} = require('../src/makepassword');
const { readFile, writeFile, hash, checkExists} = require('../src/utility')
const fs = require('fs');

/*
// Let's say you have a toHash() function in this module

test('Check toHash(): if the email:password is converted into email:hashPassword', () => {
    const input = ???
    const output = ???
    expect(p.toHash(input)).toBe(output);
});
*/
describe('Test checkExists(): does it return Found or Not Found for a password?', () => {
    test('', () => {
        const fileTest = 'passwordTest.txt'
        const notFile = 'peanuts.txt'

        let testFileExists = ''
        let testNotExists = ''

        testFileExists = checkExists(fileTest)
        console.log("Does " + fileTest + " Exists?")
        console.log(testFileExists)

        testNotExists = checkExists(notFile)
        console.log("Does " + notFile + " Exists?")
        console.log(testNotExists)
    })
})

describe("makepassword should create file", () => {
    const inputFile = './tests/passwordtest.txt';
    const outputFile = './tests/passwordtest.enc.txt';

    beforeAll(() => {
        if (fs.existsSync(outputFile)) {
            // remove previous output
            fs.unlinkSync(outputFile);
        }
    });

    test("generates correct hashed output", () => {
        // Call the function
        makepassword(inputFile, outputFile);

        //  Read and check file exists
        expect(fs.existsSync(outputFile)).toBe(true);

        // Read contents
        const outputLines = fs.readFileSync(outputFile, 'utf-8').split('\n').filter(Boolean);

        // Compare to expected
        const expectedHash = hash('mypassword');
        const expectedLine = `alan.may@best.com:${expectedHash}`;
        expect(outputLines).toContain(expectedLine);

    });

    test('returns true for valid email and password', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'sm.cho@hello.com', '123456'];
        expect(passwordjs()).toBe(true);
    });

    test('returns false for correct email but incorrect password', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'sm.cho@hello.com', 'wrongpassword'];
        expect(passwordjs()).toBe(false);
    });

    test('returns false for unknown email', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'not.in.db@example.com', '123456'];
        expect(passwordjs()).toBe(false);
    });

    test('returns false for email without password', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'sm.cho@hello.com'];
        expect(passwordjs()).toBe('false'); // returns string 'false' on invalid argument count
    });

    afterAll(() => {
        // Cleanup
        if (fs.existsSync(encodedFile)) fs.unlinkSync(encodedFile);
    });
});