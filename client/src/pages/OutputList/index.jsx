// Импорт необходимых зависимостей и модулей React
import React, { useState, useEffect } from 'react';

// Функция для вызова API бэкенда
const callBackendAPI = async () => {
    const response = await fetch('http://localhost:8080/outputlist'); // Выполнение HTTP-запроса
    const body = await response.json(); // Преобразование ответа в формат JSON

    if (!response.ok) {
        throw new Error(body.message); // Если ответ не успешен, выбросить ошибку с сообщением из тела ответа
    }

    return body.arrays; // Возврат массивов данных из ответа
};

// Основной компонент
const OutputList = () => {
    // Состояния компонента
    const [data, setData] = useState([]); // Данные, полученные с бэкенда
    const [loading, setLoading] = useState(true); // Состояние загрузки данных
    const [error, setError] = useState(null); // Состояние ошибки, если она произошла

    // Эффект, выполняющийся при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await callBackendAPI(); // Вызов функции для вызова API бэкенда
                setData(res); // Обновление состояния данными
            } catch (err) {
                setError(err.message); // Обработка ошибки и обновление состояния ошибки
            } finally {
                setLoading(false); // Окончание загрузки данных (независимо от успеха или ошибки)
            }
        };

        fetchData(); // Вызов функции загрузки данных
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только один раз

    // Если данные загружаются, отображается сообщение о загрузке
    if (loading) {
        return <p className="loading-message">Loading data...</p>;
    }

    // Рендеринг основного содержимого компонента
    return (
        <section className="arrays-section">
            {/* Заголовок */}
            <h2 className="main-title">Output Arrays</h2>
            <h2 className="section-title">Arrays</h2>
            <div className="arrays-container">
                {/* Отображение массивов данных */}
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
        </section>
    );
};

export default OutputList;