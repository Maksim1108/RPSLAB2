// Подключаем необходимую библиотеку
const mongoose = require('mongoose');

// Создаем схему для модели
const ArrayOfArraysSchema = new mongoose.Schema(
    {
        numberOfArrays: Number,
        array: Array
    },
    {
        timestamps: true,
    },
);

// Создаем модель, используя созданную схему
const arrayOfArraysModel = mongoose.model('ArrayOfArrays', ArrayOfArraysSchema);

// Экспортируем модель для использования в других файлах
module.exports = arrayOfArraysModel
