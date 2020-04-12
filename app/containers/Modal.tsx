import React, { useState, useEffect, useRef } from 'react';
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
  const inputEl = useRef(null);

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

  const handleToggleTodo = timestamp => {
    const updatedMonthTodos: Todo[] = monthTodos.map(item => {
      console.log({ item, timestamp });
      if (item.timestamp === timestamp) {
        const updatedItem = item;
        updatedItem.isDone = !item.isDone;
        return updatedItem;
      }
      return item;
    });

    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
  };

  useEffect(() => {
    const todosFromStorage = store.get('todo.2020/04') ?? [];
    setMonthTodos(todosFromStorage.reverse());
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

  useEffect(() => {
    if (todoLength <= 0) {
      return;
    }
    if (downPress) {
      setCursor(prevState =>
        prevState < todoLength ? prevState + 1 : prevState
      );
    }
    if (upPress) {
      setCursor(prevState => (prevState > -1 ? prevState - 1 : prevState));
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
      if (buttonCursor === 2) {
        handleToggleTodo(todo.timestamp);
      }
    }
  }, [downPress, upPress, leftPress, rightPress, enterPress]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (value === '') {
      return;
    }
    const updatedMonthTodos: Todo[] = [
      {
        timestamp: +new Date(),
        text: value,
        isDone: false
      },
      ...monthTodos
    ];
    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
    setValue('');
    // console.log(store.get('todo'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (cursor === -1) {
      inputEl.current.focus();
    } else {
      inputEl.current.blur();
    }
  }, [cursor]);

  return (
    <ModalWrapper>
      <Form isActive={cursor === -1}>
        <Input
          type="text"
          onChange={handleChange}
          value={value}
          ref={inputEl}
          placeholder="What are you up to?"
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          isActive={value !== '' && cursor === -1}
        >
          Do it!
        </Button>
      </Form>
      <Today>{dayjs().format('dddd, MMM D, YYYY')}</Today>
      <div>
        {monthTodos.map((todo, index) => (
          <TodoItem
            isActive={cursor === index}
            buttonCursor={buttonCursor}
            onRemove={handleRemove}
            onToggleTodo={handleToggleTodo}
            key={todo.timestamp}
            text={todo.text}
            timestamp={todo.timestamp}
            isDone={todo.isDone}
          />
        ))}
      </div>
      <SeeMore isActive={cursor === todoLength}>See more</SeeMore>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.main`
  background: #ffffffe8;
  box-shadow: rgba(23, 25, 29, 0.05) 0 6px 25px;
  margin: 10px;
  padding: 8px;
  border: 1px solid #ececec;
  border-radius: 6px;
`;

const Form = styled.form`
  display: flex;
  background: #e6e5e5;
  padding: 5px 9px;
  border: 4px solid ${({ isActive }) => (isActive ? '#ffb87b' : 'transparent')};
`;

const Today = styled.div`
  font-size: 15px;
  font-weight: lighter;
  margin: 20px 0 10px;
  color: #ff9a00;
  font-style: italic;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 25px;

  &:focus {
    outline: none;
  }
`;

const SeeMore = styled.div`
  padding: 5px;
  text-align: center;
  background: ${({ isActive }) => (isActive ? '#FFDA02' : 'inherit')};
`;

const Button = styled.button`
  background: ${({ isActive }) => (isActive ? '#258ef3' : 'inherit')};
  font-weight: bold;
  border: none;
`;
