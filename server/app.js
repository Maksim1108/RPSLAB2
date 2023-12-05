import "dotenv/config"
import express from "express"
import cors from "cors"

import {connectionToDB} from "./db.connection.js";
import {arrayOfArraysModel} from  "./models/arrayOfArraysModel.js"
import {addArraysToDB} from "./algoritmhs/algoritmhs.js";
import {shellSort} from "./algoritmhs/shellSort.js"


connectionToDB()

const app = express()
app.use(express.json());
app.use(cors());
app.get('/', (req, res)=>{
    res.send("Hello World!")
})

app.post('/upload', async (req, res) => {
    try {
        const numberOfArrays = req.body.numberOfArrays;

        const doc = new arrayOfArraysModel({
            numberOfArrays,
            array: addArraysToDB(numberOfArrays),
        });

        const array = await doc.save();

        res.status(200).json({
            message: 'Успешная загрузка массивов )',
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})

app.get('/sort', async (req, res) => {
    try {
        const arr = await arrayOfArraysModel.findOne({"numberOfArrays" : 10})

        if (!arr) {
            return res.status(404).json({
                message: 'Массив не найден',
            });
        }

        res.status(200).json({
            message: 'Массив найден',
        });

        shellSort(arr.array)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить массивы',
        });
    }
})
app.delete('/delete', async (req, res) => {
    try {
        const arr = await arrayOfArraysModel.findOneAndDelete({"numberOfArrays" : 10})

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


app.listen(process.env.PORT || 3001, () => {
    try {
        console.log(`Server listen on ${process.env.PORT} port`)
    } catch (err) {
        console.log(err)
    }
})

