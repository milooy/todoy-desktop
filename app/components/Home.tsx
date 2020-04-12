import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

const Store = require('electron-store');

const store = new Store();

export default function Home() {
  const [monthTodos, setMonthTodos] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    setMonthTodos(store.get('todo.2020/04') ?? []);
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setMonthTodos([
      ...monthTodos,
      {
        timestamp: +new Date(),
        text: value,
        isDone: false
      }
    ]);
    store.set('todo.2020/04', monthTodos);
    setValue('');
    // console.log(store.get('todo'));
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container} data-tid="container">
      <h2>Todoy</h2>
      <form>
        <input type="text" onChange={handleChange} value={value} />
        <button onClick={handleSubmit} type="submit">
          저장
        </button>
      </form>
      <ul>
        {monthTodos &&
          monthTodos.map(todo => <li key={todo.timestamp}>{todo.text}</li>)}
      </ul>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
