import React, {useState} from 'react';
import {shellSort} from '../../shellSort';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const InputAndEdit = () => {
    const [inputData, setInputData] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSort = ()   => {
        try {
            const numbersArray = inputData.split(',').map(Number);
            const sortedArray = shellSort(numbersArray);
            setSortedData(sortedArray);
        } catch (error) {
            console.error('Ошибка при сортировке:', error);
            alert('Ошибка при сортировке массива');
        }
    };

    const saveDataToDB = async () => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/save', sortedData);
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
            <h2 className="inputAndEdit__title">Введите числа через запятую:</h2>

            <form
                className="inputAndEdit__form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSort();
                }}
            >
                <input
                    className="inputAndEdit__input"
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Введите числа"
                />
                <div className="inputAndEdit__btns">
                    <button type="submit" className="inputAndEdit__btn">
                        Сортировать
                    </button>
                    <button
                        className="inputAndEdit__btn"
                        onClick={saveDataToDB}
                        disabled={inputData.length === 0 || loading}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить исходный'}
                    </button>
                    <button
                        className="inputAndEdit__btn"
                        onClick={saveDataToDB}
                        disabled={sortedData.length === 0 || loading}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить отсортированный'}
                    </button>
                </div>
            </form>

            <p className="inputAndEdit__title">
                Исходный массив: [{[...inputData].join('')}]
            </p>

            <p className="inputAndEdit__title">
                {sortedData.length <= 0 ? (
                    <span>Введите данные !</span>
                ) : (
                    <span>Отсортированный массив: [{sortedData.join(', ')}]</span>
                )}
            </p>
        </div>
    );
};

export default InputAndEdit;
