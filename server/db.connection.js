require('dotenv').config()
const mongoose = require('mongoose');

const connectionToDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("Successful connection to DB"))
        .catch((err) => console.log(err));
}

module.exports = connectionToDB