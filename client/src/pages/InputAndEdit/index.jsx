// Импорт необходимых зависимостей и модулей React
import React, {useState} from 'react';
import {shellSort} from "../../shellSort"; // Импорт собственной реализации сортировки (shellSort)
import axios from 'axios'; // Для выполнения HTTP-запросов

// Основной компонент
const InputAndEdit = () => {
    // Состояния компонента
    const [inputArray, setInputArray] = useState(''); // Входной массив, вводимый пользователем
    const [originalArray, setOriginalArray] = useState([]); // Исходный массив (не сортированный)
    const [sortedArray, setSortedArray] = useState([]); // Отсортированный массив
    const [loading, setLoading] = useState(false); // Состояние загрузки (для отображения процесса сохранения)

    // Обработчик изменения входного массива
    const handleInputChange = (e) => {
        setInputArray(e.target.value);
    };

    // Обработчик сортировки массива
    const handleSort = () => {
        const array = inputArray.split(',').map((item) => parseInt(item, 10)); // Преобразование входной строки в массив чисел
        setOriginalArray(array.slice()); // Сохранение исходного массива

        // Вызываем вашу функцию shellSort для сортировки
        const sorted = shellSort([array]);
        setSortedArray(sorted);
    };

    // Функция сохранения исходного массива в базе данных
    const saveDataToDB = async () => {
        try {
            setLoading(true); // Установка состояния загрузки
            await axios.post('http://localhost:8080/save', [originalArray]); // Выполнение POST-запроса для сохранения
        } catch (error) {
            console.error('Ошибка при сохранении массива:', error); // Обработка ошибок
        } finally {
            setLoading(false); // Снятие состояния загрузки (независимо от успеха или ошибки)
        }
    };

    // Функция сохранения отсортированного массива в базе данных
    const saveDataToDBSortedArrays = async () => {
        try {
            setLoading(true); // Установка состояния загрузки
            await axios.post('http://localhost:8080/savesorted', [...sortedArray]); // Выполнение POST-запроса для сохранения
        } catch (error) {
            console.error('Ошибка при сохранении массива:', error); // Обработка ошибок
        } finally {
            setLoading(false); // Снятие состояния загрузки (независимо от успеха или ошибки)
        }
    };

    // Рендеринг компонента
    return (
        <div className="inputAndEdit">
            {/* Ввод массива */}
            <label>
                <h2 className="inputAndEdit__title">Enter numbers separated by commas:</h2>
                <input className="inputAndEdit__input" type="text" value={inputArray} onChange={handleInputChange}/>
            </label>

            {/* Кнопка сортировки массива */}
            <button className="inputAndEdit__btn focus" onClick={handleSort}>Sort</button>

            {/* Отображение исходного и отсортированного массивов */}
            <div>
                <p className="inputAndEdit__arrays">Initial Array: [{originalArray.join(',')}]</p>
                <p className="inputAndEdit__arrays">Sorted Array: [{sortedArray.join(',')}]</p>
            </div>

            {/* Кнопки для сохранения данных в базе данных */}
            <div className="inputAndEdit__btns">
                <button
                    className="inputAndEdit__btn"
                    onClick={saveDataToDB}
                    disabled={inputArray.length === 0 || loading}
                >
                    {loading ? 'Preservation...' : 'Save initial'}
                </button>
                <button
                    className="inputAndEdit__btn"
                    onClick={saveDataToDBSortedArrays}
                    disabled={sortedArray.length === 0 || loading}
                >
                    {loading ? 'Preservation...' : 'Save sorted'}
                </button>
            </div>
        </div>
    );
};

export default InputAndEdit;