// Функция bestSort выполняет сортировку методом Шелла (Хиббарда)
const sortShell = arr => {
    const n = arr.length;

    // Вычисляем максимальный шаг по последовательности Хиббарда
    let h = 1;
    while (h < n / 2) {
        h = 2 * h + 1;
    }

    // Начинаем с самого большого шага и уменьшаем до 1
    while (h >= 1) {
        // Применяем сортировку вставками с текущим шагом
        arr.forEach((a, i) => {
            for (let j = h; j < a.length; j++) {
                const currentElement = a[j];
                let k = j;
                 // Проводим сравнение и перемещение элементов в подмассиве
                while (k >= h && currentElement < a[k - h]) {
                    a[k] = a[k - h];
                    k -= h;
                }
                a[k] = currentElement;
            }
        });

        // Уменьшаем шаг по последовательности Хиббарда
        h = Math.floor(h / 2);
    }

    return arr;
}

// Экспортируем функцию bestSort для использования в других модулях
module.exports = sortShell
