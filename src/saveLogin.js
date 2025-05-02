import mongoose from "mongoose";
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema
const loginSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Create a model
const LoginModel = mongoose.model('Login', loginSchema);

async function saveLogin(infoToSave) {
    try {
        const results = []
        // take in array of email:hashedPasswords
        for (let entry of infoToSave){
            // split array into email, and password, and save to mongodb
            const[email, password] = entry.split(':');
            const loginDoc = newLoginModel({ email, password});
            const saved = await loginDoc.save()
            results.push(saved);
        }
        // return result.
        return results;
    } catch (err) {
        console.error('Error saving login info: ', err);
    } finally {
        mongoose.connection.close();
    }
}

if (require.main === module) {

    const sampleData = [
        'sm.cho@hello.com:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
        'john.doe@test.com:abcd1234hashed5678'
    ];
    saveLogin(sampleData).then(console.log);
}

// Export the function for use in other modules
module.exports = saveLogin;