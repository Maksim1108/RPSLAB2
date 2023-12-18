import React, {useState} from 'react';
import {shellSort} from "../../shellSort";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const InputAndEdit = () => {
    const [inputArray, setInputArray] = useState('');
    const [originalArray, setOriginalArray] = useState([]);
    const [sortedArray, setSortedArray] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e) => {
        setInputArray(e.target.value);
    };

    const handleSort = () => {
        const array = inputArray.split(',').map((item) => parseInt(item, 10));
        setOriginalArray(array.slice());

        // Вызываем вашу функцию shellSort для сортировки
        const sorted = shellSort([array]);
        setSortedArray(sorted);
    };

    const saveDataToDB = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/save', [originalArray]);
        } catch (error) {
            console.error('Ошибка при сохранении массива:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveDataToDBSortedArrays = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/savesorted', [...sortedArray]);
        } catch (error) {
            console.error('Ошибка при сохранении массива:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inputAndEdit">
            <label>
                <h2 className="inputAndEdit__title">Enter numbers separated by commas:</h2>
                <input className="inputAndEdit__input" type="text" value={inputArray} onChange={handleInputChange}/>
            </label>
            <button className="inputAndEdit__btn" onClick={handleSort}>Sort</button>
            <div>
                <p className="inputAndEdit__arrays">Initial Array: [{originalArray.join(',')}]</p>
                <p className="inputAndEdit__arrays">Sorted Array: [{sortedArray.join(',')}]</p>
            </div>
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