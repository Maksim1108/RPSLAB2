import React, { useState, useEffect } from 'react';

const callBackendAPI = async () => {
    const response = await fetch('http://localhost:8080/outputlist');
    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message);
    }

    return body.arrays;
};

const OutputList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await callBackendAPI();
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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