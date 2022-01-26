const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1/inotebook"    // it returns a promise , get it. thats why unknown timeout error is coming because their is no then and cathc function to catch it. 
// it creating the connection if new database is present.
async function connectToMongo() {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err))
}
module.exports = connectToMongo;