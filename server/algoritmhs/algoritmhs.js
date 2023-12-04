function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const addArraysToDB = (numberOfArrays) => {
    const arrayOfArrays = []

    for (let i = 0; i < numberOfArrays; i++) {
        // Генерируем случайный размер массива от 1 до 10 (включительно)
        let arraySize = getRandomInt(1, 10);

        // Создаем массив и заполняем его случайными числами от 1 до 100 (включительно)
        let newArray = [];
        for (let j = 0; j < arraySize; j++) {
            newArray.push(getRandomInt(1, 100));
        }

        // Добавляем новый массив в arrayOfArrays
        arrayOfArrays.push(newArray);
    }

    return arrayOfArrays
}