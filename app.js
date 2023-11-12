const readline = require('readline')
const {input} = require("readline");

const displayIntroduction = require('./interface/interface')
const shellSort = require('./algorithms/shellSort')
const {readFromFile} = require('./fileWork/fileWork')
const FILE_PATH = require('./config/path')
const enums = require('./enums')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dataArr = [];
const promptUser = () => {
    rl.question("> ", (input) => {

        if (input.toLowerCase() === 'stop') {
            rl.close();
            console.log("Данные в виде массива:", dataArr);
            console.log("\nОтсортированный массив:");
            shellSort(dataArr);
            return; // Завершаем выполнение функции, чтобы избежать вывода "Введите число"
        }

        const isNumber = parseInt(input, 10);

        if (isNaN(isNumber)) {
            console.log("Введите число");
        } else {
            dataArr.push(Number(input));
        }

        promptUser(); // Вызываем рекурсивно для следующего ввода
    });
};

const app = () => {

    displayIntroduction()

    rl.question("> ", (input) => {
        switch (input) {
            case enums.KEYBOARD_INPUT:
                console.log("Введите данные или \"stop\" для выхода")
                promptUser()
                break;
            case enums.UPLOAD_FROM_FILE:
                console.log("Загрузка из файла ✓")
                readFromFile(FILE_PATH, (err, dataArr) => {
                    if (err) {
                        console.error('Произошла ошибка:', err);
                    } else {
                        console.log('Данные из файла в виде массива:', dataArr);
                        console.log('Отсортированный массив:')
                        shellSort(dataArr)
                    }
                    process.exit();
                })
                break;
            case enums.QUIT:
                console.log('Завершение работы программы.')
                break;
            default:
                console.log('Неправильный ввод. Попробуйте снова.')
                process.exit();
        }
    })
    return 0;
}

app();
