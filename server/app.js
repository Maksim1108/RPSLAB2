require('dotenv').config()
const express = require('express')
const cors = require("cors")
const connectionToDB = require("./db.connection");
const arrayOfArraysModel = require("./models/arrayOfArraysModel");
const testArrayModel = require("./models/testArrayMode")
const sortedArrayModel = require("./models/sortedArrayModel")
const addArraysToDB = require("./algoritmhs/algoritmhs");

connectionToDB()

const app = express()

app.use(express.json());
app.use(cors());
app.post('/upload', async (req, res) => {
    try {
        const numberOfArrays = req.body.numberOfArrays;

        const doc = new arrayOfArraysModel({
            numberOfArrays,
            array: addArraysToDB(numberOfArrays),
        });

        const array = await doc.save();

        res.status(200).json({
            message: 'Успешная загрузка массивов',
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})
app.post('/save', async (req, res) => {
    try {
        const array = req.body;

        const doc = new sortedArrayModel({
            array: array,
        });

        const sortedArray = await doc.save();

        res.status(200).json({
            message: 'Успешная загрузка отсортированного массива',
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массив',
        });
    }
})
app.get('/sort', async (req, res) => {
    try {
        const arrays = await arrayOfArraysModel.find()
        const sortedArrays = await sortedArrayModel.find()

        if (!arrays) {
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }

        res.json({
            arrays,
            sortedArrays
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})
app.get('/outputlist', async (req, res) => {
    try {
        const arrays = await arrayOfArraysModel.find()
        const sortedArrays = await sortedArrayModel.find()

        if (!arrays) {
            return res.status(404).json({
                message: 'Спикос массивов пуст',
            });
        }

        res.json({
            arrays,
            sortedArrays
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
        });
    }
})

// =============================== TEST REQUESTS ================================================================================== //

app.post('/ulpoadtestdata', async (req, res) => {
    try {
        const numberOfArrays = req.body.numberOfArrays;

        const doc = new testArrayModel({
            numberOfArrays,
            array: addArraysToDB(numberOfArrays),
        });

        const array = await doc.save();

        res.status(200).json({
            message: 'Успешная загрузка массивов',
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

app.post('/testsortdata', async (req, res) => {
    try {
        const arr = await testArrayModel.findOne({"numberOfArrays": req.body.numberOfArrays})

        if (!arr) {
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }

        res.json({
            arr
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

app.post('/delete', async (req, res) => {
    try {
        const arr = await testArrayModel.findOneAndDelete({"numberOfArrays": req.body.numberOfArrays})

        if (!arr) {
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }

        res.status(200).json({
            message: 'Массив найден и удален',
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

app.listen(process.env.PORT, () => {
    try {
        console.log(`Server listen on ${process.env.PORT} port`)
    } catch (err) {
        console.log(err)
    }
})
