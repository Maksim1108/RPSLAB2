const chai = require('chai');
const axios = require('axios');
const {expect} = chai;
const bestSort = require("./algoritmhs/sortShell")

describe('POST /ulpoadtestdata', () => {
    it('should successfully upload 100 arrays', async () => {
        try {
            const response = await axios.post('http://localhost:8080/ulpoadtestdata', {
                numberOfArrays: 100,
            });

            expect(response.status).to.equal(200);
            expect(response.data.message).to.equal('Успешная загрузка массивов');
        } catch (error) {
            throw error;
        }
    });
});
describe('POST /ulpoadtestdata', () => {
    it('should successfully upload 1000 arrays', async () => {
        try {
            const response = await axios.post('http://localhost:8080/ulpoadtestdata', {
                numberOfArrays: 1000,
            });

            expect(response.status).to.equal(200);
            expect(response.data.message).to.equal('Успешная загрузка массивов');
        } catch (error) {
            throw error;
        }
    });
});

describe('POST /ulpoadtestdata', () => {
    it('should successfully upload 10000 arrays', async () => {
        try {
            const response = await axios.post('http://localhost:8080/ulpoadtestdata', {
                numberOfArrays: 10000,
            });

            expect(response.status).to.equal(200);
            expect(response.data.message).to.equal('Успешная загрузка массивов');
        } catch (error) {
            throw error;
        }
    });
});

describe('Test Sorting 100 arr', () => {
    it('should sort and respond with success', async () => {
        const response = await axios.post(`http://localhost:8080/testsortdata`, {
            numberOfArrays: 100
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);

        // Считаем время выполнения теста
        const startTime = new Date();
        // Далее добавьте код для сортировки массивов (время выполнения теста)
        bestSort(response.data.arr.array)

        const endTime = new Date();
        const totalTime = endTime - startTime;

        // Рассчитываем среднее время сортировки 1 массива
        const averageTimePerArray = totalTime / 100;

        // Выводим результаты теста
        console.log(`  Среднее время сортировки 1 массива: ${averageTimePerArray} ms`);
    });
});

describe('Test Sorting 1000 arr', () => {
    it('should sort and respond with success', async () => {
        const response = await axios.post(`http://localhost:8080/testsortdata`, {
            numberOfArrays: 1000
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);

        // Считаем время выполнения теста
        const startTime = new Date();
        // Далее добавьте код для сортировки массивов (время выполнения теста)
        bestSort(response.data.arr.array)

        const endTime = new Date();
        const totalTime = endTime - startTime;

        // Рассчитываем среднее время сортировки 1 массива
        const averageTimePerArray = totalTime / 100;

        // Выводим результаты теста
        console.log(`  Среднее время сортировки 1 массива: ${averageTimePerArray} ms`);
    });
});

describe('Test Sorting 10000 arr', () => {
    it('should sort and respond with success', async () => {
        const response = await axios.post(`http://localhost:8080/testsortdata`, {
            numberOfArrays: 10000
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);

        // Считаем время выполнения теста
        const startTime = new Date();
        // Далее добавьте код для сортировки массивов (время выполнения теста)
        bestSort(response.data.arr.array)

        const endTime = new Date();
        const totalTime = endTime - startTime;

        // Рассчитываем среднее время сортировки 1 массива
        const averageTimePerArray = totalTime / 100;

        // Выводим результаты теста
        console.log(`  Среднее время сортировки 1 массива: ${averageTimePerArray} ms`);
    });
});

describe('Test Deleting 100 arr', () => {
    it('should delete 100 arr', async () => {
        const response = await axios.post(`http://localhost:8080/delete`, {
            numberOfArrays: 100
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);
        expect(response.data.message).to.equal('Массив найден и удален');
    });
});

describe('Test Deleting 1000 arr', () => {
    it('should delete 1000 arr', async () => {
        const response = await axios.post(`http://localhost:8080/delete`, {
            numberOfArrays: 1000
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);
        expect(response.data.message).to.equal('Массив найден и удален');
    });
});


describe('Test Deleting 10000 arr', () => {
    it('should delete 10000 arr', async () => {
        const response = await axios.post(`http://localhost:8080/delete`, {
            numberOfArrays: 10000
        });

        // Проверяем успешный статус ответа
        expect(response.status).to.equal(200);
        expect(response.data.message).to.equal('Массив найден и удален');
    });
});


