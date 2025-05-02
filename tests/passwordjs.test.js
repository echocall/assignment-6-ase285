// Make tests when you have sub functions in this module.
// passwordjs() is tested by acceptance tests (acceptance.bat)

const fs = require('fs');
const path = require('path');
const passwordjs = require('../src/passwordjs');
const makepassword = require('../src/makepassword');
const { hash } = require('../src/utility');

describe('passwordjs()', () => {
    const unencodedFile = './tests/passwordtest.txt';
    const encodedFile = './tests/passwordtest.enc.txt';

    beforeAll(() => {
        // 1. Ensure a clean test environment
        if (fs.existsSync(encodedFile)) {
            fs.unlinkSync(encodedFile);
        }

        // 2. Run makepassword to generate the encoded file
        makepassword(unencodedFile, encodedFile);
    });

    test('returns true for matching email and password', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'sm.cho@hello.com', '123456'];
        const result = passwordjs();
        expect(result).toBe(true);
    });

    test('returns false for incorrect password', () => {
        process.argv = ['node', 'passwordjs.js', encodedFile, 'sm.cho@hello.com', 'wrongpassword'];
        const result = passwordjs();
        expect(result).toBe(false);
    });

    test('returns false for missing arguments', () => {
        process.argv = ['node', 'passwordjs.js', 'sm.cho@hello.com'];
        const result = passwordjs();
        expect(result).toBe('false');
    });

    afterAll(() => {
        // Clean up test files
        if (fs.existsSync(encodedFile)) fs.unlinkSync(encodedFile);
    });
});
