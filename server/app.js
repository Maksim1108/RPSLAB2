// Загрузка и использование переменных окружения из файла .env
require('dotenv').config()

// Импорт необходимых модулей и файлов
const express = require('express')
const cors = require("cors")
const connectionToDB = require("./db.connection");
const arrayOfArraysModel = require("./models/arrayOfArraysModel");
const testArrayModel = require("./models/testArrayMode")
const sortedArrayModel = require("./models/sortedArrayModel")
const addArraysToDB = require("./algoritmhs/algoritmhs");

// Установка соединения с базой данных
connectionToDB()

// Инициализация экземпляра Express
const app = express()

// Использование middleware для обработки JSON и CORS
app.use(express.json());
app.use(cors());

// Роут для загрузки массивов
app.post('/upload', async (req, res) => {
    try {
        const numberOfArrays = req.body.numberOfArrays;

         // Создание нового документа в модели arrayOfArraysModel
        const doc = new arrayOfArraysModel({
            numberOfArrays,
            array: addArraysToDB(numberOfArrays),
        });

        // Сохранение документа в базе данных
        const array = await doc.save();

        // Отправка успешного ответа
        res.status(200).json({
            message: 'Успешная загрузка массивов',
        });

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

// Роут для сохранения отсортированного массива
app.post('/save', async (req, res) => {
    try {
        const array = req.body;

        // Создание нового документа в модели sortedArrayModel
        const doc = new arrayOfArraysModel({
            array: array,
        });

        // Сохранение документа в базе данных
        const originalArray = await doc.save();

        // Отправка успешного ответа
        res.status(200).json({
            message: 'Успешная загрузка отсортированного массива',
        });

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массив',
        });
    }
})
app.post('/savesorted', async (req, res) => {
    try {
        const array = req.body;

        // Создание нового документа в модели testArrayModel
        const doc = new sortedArrayModel({
            array: array,
        });

        // Сохранение документа в базе данных
        const sortedArray = await doc.save();

        // Отправка успешного ответа
        res.status(200).json({
            message: 'Успешная загрузка отсортированного массива',
        });

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массив',
        });
    }
})

// Роут для получения массивов и отсортированных массивов
app.get('/sort', async (req, res) => {
    try {
        // Получение всех массивов и отсортированных массивов из базы данных
        const arrays = await arrayOfArraysModel.find()
        const sortedArrays = await sortedArrayModel.find()

        if (!arrays) {
            // Отправка ответа об ошибке, если массивы не найдены
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }
        // Отправка успешного ответа с массивами и отсортированными массивами
        res.json({
            arrays,
            sortedArrays
        })

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

// Роут для получения списка массивов
app.get('/outputlist', async (req, res) => {
    try {
        // Получение всех массивов и отсортированных массивов из базы данных
        const arrays = await arrayOfArraysModel.find()
        const sortedArrays = await sortedArrayModel.find()

        if (!arrays) {
            // Отправка ответа об ошибке, если массивы не найдены
            return res.status(404).json({
                message: 'Спикос массивов пуст',
            });
        }
        // Отправка успешного ответа с массивами и отсортированными массивами
        res.json({
            arrays,
            sortedArrays
        })

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            success: false,
        });
    }
})

// =============================== TEST REQUESTS ================================================================================== //
// Роут для загрузки тестовых данных
app.post('/ulpoadtestdata', async (req, res) => {
    try {
        const numberOfArrays = req.body.numberOfArrays;
         // Создание нового документа в модели testArrayModel
        const doc = new testArrayModel({
            numberOfArrays,
            array: addArraysToDB(numberOfArrays),
        });
        // Сохранение документа в базе данных
        const array = await doc.save();
        
        // Отправка успешного ответа
        res.status(200).json({
            message: 'Успешная загрузка массивов',
        });

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

// Роут для получения отсортированного тестового массива
app.post('/testsortdata', async (req, res) => {
    try {
        // Поиск тестового массива по числу массивов
        const arr = await testArrayModel.findOne({"numberOfArrays": req.body.numberOfArrays})

        if (!arr) {
            // Отправка ответа об ошибке, если массив не найден
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }
        // Отправка успешного ответа с тестовым массивом
        res.json({
            arr
        })

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

// Роут для удаления тестового массива
app.post('/delete', async (req, res) => {
    try {
        // Поиск и удаление тестового массива по числу массивов
        const arr = await testArrayModel.findOneAndDelete({"numberOfArrays": req.body.numberOfArrays})

        if (!arr) {
            // Отправка ответа об ошибке, если массив не найден
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }
        // Отправка успешного ответа
        res.status(200).json({
            message: 'Массив найден и удален',
        });

    } catch (err) {
        // Отправка ответа об ошибке
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})
// Запуск сервера на указанном порту
app.listen(process.env.PORT, () => {
    try {
        console.log(`Server listen on ${process.env.PORT} port`)
    } catch (err) {
        console.log(err)
    }
})
