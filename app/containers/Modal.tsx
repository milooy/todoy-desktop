import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import useKeyPress from '../hooks/useKeyPress';

const Store = require('electron-store');

const store = new Store();

export default function Modal() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [buttonCursor, setButtonCursor] = useState(2);
  const todoLength = monthTodos.length;

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const enterPress = useKeyPress('Enter');

  const handleRemove = timestamp => {
    const updatedMonthTodos: Todo[] = monthTodos.filter(
      item => item.timestamp !== timestamp
    );

    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
  };

  useEffect(() => {
    setMonthTodos(store.get('todo.2020/04') ?? []);
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

  useEffect(() => {
    if (todoLength <= 0) {
      return;
    }
    if (downPress) {
      setCursor(prevState =>
        prevState < todoLength - 1 ? prevState + 1 : prevState
      );
    }
    if (upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    if (leftPress) {
      setButtonCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    if (rightPress) {
      setButtonCursor(prevState => (prevState < 2 ? prevState + 1 : prevState));
    }
    if (enterPress) {
      const todo = monthTodos[cursor];
      if (todo === undefined) {
        return;
      }
      /** Remove */
      if (buttonCursor === 1) {
        handleRemove(todo.timestamp);
      }
    }
  }, [downPress, upPress, leftPress, rightPress, enterPress]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (value === '') {
      return;
    }
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
      <div>
        {monthTodos.map((todo, index) => (
          <TodoItem
            isActive={cursor === index}
            buttonCursor={buttonCursor}
            onRemove={handleRemove}
            key={todo.timestamp}
            text={todo.text}
            timestamp={todo.timestamp}
            isDone={todo.isDone}
          />
        ))}
      </div>
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
