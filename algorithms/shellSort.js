function shellSort(arr) {
    const n = arr.length;

    // Вычисляем максимальный шаг по последовательности Хиббарда
    let h = 1;
    while (h < n / 2) {
        h = 2 * h + 1;
    }

    // Начинаем с самого большого шага и уменьшаем до 1
    while (h >= 1) {
        // Применяем сортировку вставками с текущим шагом
        for (let i = h; i < n; i++) {
            const currentElement = arr[i];
            let j = i;
            while (j >= h && arr[j - h] > currentElement) {
                arr[j] = arr[j - h];
                j -= h;
            }
            arr[j] = currentElement;
        }

        // Уменьшаем шаг по последовательности Хиббарда
        h = Math.floor(h / 2);
    }

    console.log(arr);
}

// Экспорт функции для использования в других модулях
module.exports = shellSort;