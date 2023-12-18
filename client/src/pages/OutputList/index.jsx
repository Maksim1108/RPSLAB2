import React, { useState, useEffect } from 'react';

// Функция для вызова бэкенд-API
const callBackendAPI = async () => {
    // Отправка запроса на сервер
    const response = await fetch('http://localhost:8080/outputlist');
    const body = await response.json();

    // Обработка ошибок при получении данных
    if (!response.ok) {
        throw new Error(body.message);
    }

    return body.arrays;
};

// Компонент OutputList
const OutputList = () => {
   // Состояния компонента
    const [data, setData] = useState([]); // Данные полученные с бэкенда
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Ошибка, если таковая возникла

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Вызов функции для получения данных
                const res = await callBackendAPI();
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Вызов функции загрузки данных
    }, []);

     // Визуализация компонента
    if (loading) {
        return <p>Загрузка данных...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <section className="arrays-section">
            <h2 className="section-title">Arrays</h2>
            <div className="arrays-container">
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
