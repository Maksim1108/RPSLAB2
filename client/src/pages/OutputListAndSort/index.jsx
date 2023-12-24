// Импорт необходимых зависимостей и модулей React
import React, {useState, useEffect} from 'react';
import axios from 'axios'; // Для выполнения HTTP-запросов
import {shellSort} from '../../shellSort'; // Импорт собственной реализации сортировки (shellSort)
import {Link} from "react-router-dom"; // Для создания ссылок маршрутизатора React

// Основной компонент
const OutputListAndSort = () => {
    // Состояния компонента
    const [data, setData] = useState([]); // Исходные данные
    const [sortedData, setSortedData] = useState([]); // Отсортированные данные
    const [loading, setLoading] = useState(true); // Состояние загрузки данных

    // Загрузка данных с сервера при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sort'); // HTTP GET-запрос
                setData(response.data.arrays || []); // Обновление состояния с полученными данными
                setLoading(false); // Окончание загрузки
            } catch (error) {
                console.error('Error fetching data:', error); // Обработка ошибок
            }
        };

        fetchData(); // Вызов функции загрузки данных
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только один раз

    // Обработчик сортировки массивов
    const handleSort = () => {
        if (Array.isArray(data)) {
            const deepCopyData = JSON.parse(JSON.stringify(data)); // Создание глубокой копии массива data
            const sortedDataArray = deepCopyData.map(obj => {
                const tmp = obj.array;
                return {
                    array: shellSort(tmp) // Применение сортировки к каждому вложенному массиву
                };
            });
            setSortedData(sortedDataArray); // Обновление состояния с отсортированными данными
        } else {
            console.error('Data is not an array.'); // Обработка случая, когда data не является массивом
        }
    };

    // Отображение загрузочного сообщения при загрузке данных
    if (loading) {
        return <p className="loading-message">Loading data...</p>;
    }

    // Рендеринг основного содержимого компонента
    return (
        <div className="edit-and-sort-container">
            {/* Заголовок */}
            <h2 className="main-title">Output and Sort Array</h2>

            {/* Вывод исходных массивов */}
            <h3 className="section-title">Original Arrays</h3>
            <div className="array-section">
                {data.map((item, index) => (
                    <div key={index} className="array-item">
                        <h4 className="array-index">{index + 1}</h4>
                        <ul className="nested-arrays">
                            {item.array.map((nestedArray, nestedIndex) => (
                                <li key={nestedIndex} className="nested-array">
                                    {nestedIndex > 0 && <span className="separator"> </span>}
                                    <span className="array-content">[{nestedArray.join(', ')}]</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Вывод отсортированных массивов, если они есть */}
            <h3 className="section-title">Sorted Arrays</h3>
            <div className="array-section">
                {sortedData.length !== 0 && (
                    <>
                        {sortedData.map((item, index) => (
                            <div key={index} className="array-item">
                                <h4 className="array-index">{index + 1}</h4>
                                <ul className="nested-arrays">
                                    {item.array.map((nestedArray, nestedIndex) => (
                                        <li key={nestedIndex} className="nested-array">
                                            {nestedIndex > 0 && <span className="separator"> </span>}
                                            <span className="array-content">[{nestedArray.join(', ')}]</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Кнопки для сортировки массива и возврата на предыдущую страницу */}
            <div className="button-container">
                <button className="action-button" onClick={handleSort}>
                    Sort Array
                </button>
                <button className="action-button">
                    <Link className="action-button" to="/">Go Back</Link>
                </button>
            </div>
        </div>
    );
};

export default OutputListAndSort;