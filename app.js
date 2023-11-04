const readline = require('readline')
let fs = require('fs')

const displayIntroduction = require('./interface/interface')
const shellSort = require('./algorithms/shellSort')
const {readFromFile} = require('./fileWork/fileWork')
const FILE_PATH = require('./config/path')
const {input} = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dataArr = [];
const KEYBOARD_INPUT = '1';
const UPLOAD_FROM_FILE = '2';
const QUIT = '3'

displayIntroduction()

const promptUser = () => {
    rl.question("> " , (input) => {
        if (input.toLowerCase() === 'stop') {
            rl.close();
            console.log("Данные в виде массива:", dataArr)
            console.log("\nОтсортированный массив:")
            shellSort(dataArr)
        }
        else {
            dataArr.push(Number(input));
            promptUser();
        }
    });
}
const app = () => {
        rl.question("> " , (input) => {
            switch (input) {
                case KEYBOARD_INPUT:
                    console.log("Введите данные или \"stop\" для выхода")
                    promptUser()
                    break;
                case UPLOAD_FROM_FILE:
                    console.log("Загрузка из файла ✓")
                    readFromFile(FILE_PATH, (err,dataArr) => {
                        if (err) {
                            console.error('Произошла ошибка:', err);
                        } else {
                            console.log('Данные из файла в виде массива:', dataArr);
                            console.log('Отсортированный массив:')
                            shellSort(dataArr)
                        }
                    })
                    break;
                case QUIT:
                    console.log('Завершение работы программы.')
                    break;
                default:
                    console.log('Неправильный ввод. Попробуйте снова.\n')
                    break;
            }
        })
    return 0;
}

app();
