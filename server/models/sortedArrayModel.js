// Подключаем необходимую библиотеку
const mongoose = require('mongoose');

// Создаем схему для модели
const SortedArraySchema = new mongoose.Schema(
    {
        array: Array,
    },
    {
        timestamps: true,
    },
);

// Создаем модель, используя созданную схему
const sortedArrayModel = mongoose.model('SortedArray', SortedArraySchema);

// Экспортируем модель для использования в других файлах
module.exports = sortedArrayModel
