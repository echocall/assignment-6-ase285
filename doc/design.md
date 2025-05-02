__makepassword.js__
This module handles reading in the file of email:password pairs form password.txt, splitting them into an array, converting the password into a hash, writing them to password.enc.txt, and then writing them to the database.

__Imports__
readFile, writeFile, hash, checkExists from utilities.js
saveLogin from saveLogin.js
fs from 'fs'

