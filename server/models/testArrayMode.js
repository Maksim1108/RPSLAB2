// Подключаем необходимую библиотеку
const mongoose = require('mongoose');

// Создаем схему для модели
const TestArraySchema = new mongoose.Schema(
    {
        numberOfArrays: Number,
        array: Array,
    },
    {
        timestamps: true,
    },
);

// Создаем модель, используя созданную схему
const testArrayModel = mongoose.model('TestArrays', TestArraySchema);

// Экспортируем модель для использования в других файлах
module.exports = testArrayModel
