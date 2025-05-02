### Modules

#### `makepassword.js`
Handles reading the file of `email:password` pairs from `password.txt`, splitting them, hashing the password, writing them to `password.enc.txt`, and saving them to the database.

**Imports:**
- `readFile`, `writeFile`, `hash`, `checkExists` from `utilities.js`
- `saveLogin` from `saveLogin.js`
- `fs` from `'fs'`

**Function: `makepassword(passwordFileName, passwordEncFileName)`**
- Takes in the input and output file names.
- Contains `encodePassword` (scoped locally) to:
    - Read and split each line
    - Hash the password
    - Write `email:hashedPassword` to an output array
- Checks if output file already exists via `checkExists`
- If not, writes output to file with `writeFile`
- Then, passes data to `saveLogin` to store in the database

---

#### `passwordjs.js`
Handles CLI input to check if a provided `email` and `password` match a hashed pair in the file.

**Imports:**
- `hash`, `readFile` from `utilities.js`
- `makePassword` from `makepassword.js`
- `fs` from `'fs'`

**Function: `passwordjs()`**
- Called via CLI:
  ```bash
  node passwordjs.js <targetFileName> <email> <password>
  ```  
- Parses inputs
- Hashes the password
- Reads the target file
- Checks if `email:hashedPassword` exists
- Returns boolean result

---

#### `saveLogin.js`
Writes an `email` and hashed `password` to the MongoDB database.

**Function: `saveLogin(infoToSave)`**
- Accepts an array of `email:hashedPassword`
- Splits each into `email` and `password`
- Saves them to the database model

---

#### `utility.js`
Helper functions used across the modules.

**Imports:**
- `fs` from `'fs'`
- `createHash` from `'crypto'`

**Functions:**

- `readFile(fileName)`
    - Reads a file and returns its contents as an array

- `writeFile(array, fileName)`
    - Writes an array to a file, each item on a new line

- `hash(input)`
    - Returns a hashed string using `createHash`

- `checkExists(fileName)`
    - Returns `true` if file exists, otherwise `false`  

