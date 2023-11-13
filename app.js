const readline = require('readline')
const {input} = require("readline");

const displayIntroduction = require('./interface/interface')
const shellSort = require('./algorithms/shellSort')
const {readFromFile} = require('./fileWork/fileWork')
const FILE_PATH = require('./config/path')
const enums = require('./enums')

const rl = readline.createInterface({ // модуль для создания интерфейся ввода и вывода в консоль
    input: process.stdin,
    output: process.stdout
});

let dataArr = [];
const promptUser = () => { // выбор пользователя из меню
    rl.question("> ", (input) => {

        if (input.toLowerCase() === 'stop') { // если введен stop, то вывод данных
            rl.close();
            console.log("Данные в виде массива:", dataArr);
            console.log("\nОтсортированный массив:");
            shellSort(dataArr);
            return; // Завершаем выполнение функции, чтобы избежать вывода "Введите число"
        }

        const isNumber = parseInt(input, 10);

        if (isNaN(isNumber)) { // проверка на ввод числа, иначе добавление в массив
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
            case enums.KEYBOARD_INPUT: // ручной ввод массива
                console.log("Введите данные или \"stop\" для выхода")
                promptUser()
                break;
            case enums.UPLOAD_FROM_FILE: // загрузка массива из файла
                console.log("Загрузка из файла ✓")
                readFromFile(FILE_PATH, (err, dataArr) => { // проверка пути, если успешно то вывод данный
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
            case enums.QUIT: // завершение
                console.log('Завершение работы программы.')
                process.exit()
                break;
            default: // неправильный выбор из меню
                console.log('Неправильный ввод. Попробуйте снова.')
                process.exit()
        }
    })
    return 0;
}

app();
