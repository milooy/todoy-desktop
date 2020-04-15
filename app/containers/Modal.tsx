import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import useKeyPress from '../hooks/useKeyPress';
import TodoInput from '../components/TodoInput';

const Store = require('electron-store');

const store = new Store();

export default function Modal() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [buttonCursor, setButtonCursor] = useState(2);
  const todoLength = monthTodos.length;

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const enterPress = useKeyPress('Enter');

  const handleRemove = (timestamp: number) => {
    const updatedMonthTodos: Todo[] = monthTodos.filter(
      item => item.timestamp !== timestamp
    );

    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
  };

  const handleToggleTodo = (timestamp: number) => {
    const updatedMonthTodos: Todo[] = monthTodos.map(item => {
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
      /** Click Remove Button */
      if (buttonCursor === 1) {
        handleRemove(todo.timestamp);
      }
      /** Click Done Button */
      if (buttonCursor === 2) {
        handleToggleTodo(todo.timestamp);
      }
    }
  }, [downPress, upPress, leftPress, rightPress, enterPress]);

  const handleSubmit = (value: string) => {
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
  };

  return (
    <ModalWrapper>
      <TodoInput cursor={cursor} onSubmitValue={handleSubmit} />
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

const Today = styled.div`
  font-size: 15px;
  font-weight: lighter;
  margin: 20px 0 10px;
  color: #ff9a00;
  font-style: italic;
`;

const SeeMore = styled.div`
  padding: 5px;
  text-align: center;
  background: ${({ isActive }: { isActive: boolean }) =>
    isActive ? '#FFDA02' : 'inherit'};
`;
