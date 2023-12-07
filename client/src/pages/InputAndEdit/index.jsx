import React, { useState } from 'react';
import { shellSort } from '../../shellSort';

const InputAndEdit = () => {
    const [inputData, setInputData] = useState('');
    const [sortedData, setSortedData] = useState([]);

    const handleSort = () => {
        // Разбиваем введенные числа по запятой и преобразуем в массив
        const numbersArray = inputData.split(',').map(Number);

        // Вызываем функцию сортировки
        const sortedArray = shellSort([...numbersArray]);

        // Обновляем состояние с отсортированным результатом
        setSortedData(sortedArray);
    };

    return (
        <div className="App">
            <h2>Введите числа через запятую:</h2>
            <input
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Введите числа"
            />
            <button onClick={handleSort}>Сортировать</button>

            <p>
                {sortedData.length > 0 && (
                    <>
                        <strong>Отсортированные числа:</strong> {sortedData.join(', ')}
                    </>
                )}
            </p>
        </div>
    );
};

export default InputAndEdit;