import React, { useState } from 'react';
import {shellSort} from "../../shellSort";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const InputAndEdit = () => {
    const [inputArray, setInputArray] = useState('');
    const [originalArray, setOriginalArray] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setInputArray(e.target.value);
    };

    const handleSort = () => {
        const array = inputArray.split(',').map((item) => parseInt(item, 10));
        setOriginalArray(array.slice());

        // Вызываем вашу функцию shellSort для сортировки
        const sorted = shellSort([array]);
        setSortedArray(sorted[0]);
    };

    const saveDataToDB = async (arrayToSave) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/save', arrayToSave);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при сохранении массива:', error);
            alert('Ошибка при сохранении массива');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inputAndEdit">
            <label>
                <h2 className="inputAndEdit__title">Введите числа через запятую:</h2>
                <input className="inputAndEdit__input" type="text" value={inputArray} onChange={handleInputChange} />
            </label>
            <button className="inputAndEdit__btn" onClick={handleSort}>Сортировать</button>
            <div>
                <p className="inputAndEdit__title">Исходный массив: [{originalArray.join(',')}]</p>
                <p className="inputAndEdit__title">Отсортированный массив: [{sortedArray.join(',')}]</p>
            </div>
            <div className="inputAndEdit__btns">
                <button
                    className="inputAndEdit__btn"
                    onClick={ () => saveDataToDB(originalArray)}
                    disabled={inputArray.length === 0 || loading}
                >
                    {loading ? 'Сохранение...' : 'Сохранить исходный'}
                </button>
                <button
                    className="inputAndEdit__btn"
                    onClick={() => saveDataToDB(sortedArray)}
                    disabled={sortedArray.length === 0 || loading}
                >
                    {loading ? 'Сохранение...' : 'Сохранить отсортированный'}
                </button>
            </div>
        </div>
    );
};

export default InputAndEdit;