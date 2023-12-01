const fs = require('fs');

// Функция для чтения данных из файла и передачи их в виде массива чисел в функцию обратного вызова
const readFromFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // В случае ошибки выводим сообщение и передаем ошибку в функцию обратного вызова
            console.error('Произошла ошибка при чтении файла:', err);
            callback(err, null);
            return;
        }

        // Разбиваем данные на массив чисел, используя пробелы как разделители
        const arr = data.split(/\s+/).map(Number);

        // Вызываем функцию обратного вызова, передавая отфильтрованный массив чисел
        callback(null, arr);
    });
}

// Экспорт модуля fs и функции readFromFile для использования в других модулях
module.exports = {fs, readFromFile};