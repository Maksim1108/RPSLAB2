import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {shellSort} from '../../shellSort';
import {Link} from "react-router-dom";

const OutputListAndSort = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sort');
                setData(response.data.arrays || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSort = () => {
        if (Array.isArray(data)) {
            const deepCopyData = JSON.parse(JSON.stringify(data)); // Создание глубокой копии массива data
            const sortedDataArray = deepCopyData.map(obj => {
                const tmp = obj.array;
                return {
                    array: shellSort(tmp)
                };
            });
            setSortedData(sortedDataArray);
        } else {
            console.error('Data is not an array.');
        }
    };

    if (loading) {
        return <p>Загрузка данных...</p>;
    }

    return (
        <div className="edit-and-sort-container">
            <h2 className="main-title">Edit and Sort Array</h2>

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

            {sortedData.length !== 0 ? (<h3 className="section-title">Sorted Arrays</h3>) : (<h3 className="section-title">Sorted Arrays</h3>)}
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