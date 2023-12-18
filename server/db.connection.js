require('dotenv').config()
const mongoose = require('mongoose');

const connectionToDB = () => {
    // Установка соединения с базой данных
    mongoose.connect(process.env.DB_URL)
        // Вывод сообщения об успешном соединении с базой данных
        .then(() => console.log("Successful connection to DB"))
        // Вывод сообщения об ошибке подключения к базе данных
        .catch((err) => console.log(err));
}

module.exports = connectionToDB
