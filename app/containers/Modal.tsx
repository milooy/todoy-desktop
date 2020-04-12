import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';

const Store = require('electron-store');

const store = new Store();

export default function Modal() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    setMonthTodos(store.get('todo.2020/04') ?? []);
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const updatedMonthTodos: Todo[] = [
      ...monthTodos,
      {
        timestamp: +new Date(),
        text: value,
        isDone: false
      }
    ];
    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
    setValue('');
    // console.log(store.get('todo'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <ModalWrapper>
      <Form>
        <Input type="text" onChange={handleChange} value={value} autoFocus />
        <button onClick={handleSubmit} type="submit">
          저장
        </button>
      </Form>
      <h1>{dayjs().format('ddd, MMM D, YYYY')}</h1>
      <ul>
        {monthTodos &&
          monthTodos.map(todo => <li key={todo.timestamp}>{todo.text}</li>)}
      </ul>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.main`
  background: white;
  box-shadow: rgba(23, 25, 29, 0.05) 0 6px 25px;
  margin: 10px;
  padding: 12px;
  border: 1px solid #ececec;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  background: #e6e5e5;
  padding: 12px;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 25px;
`;
