import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import useCursor from '../hooks/useCursor';
import TodoInput from '../components/TodoInput';

const Store = require('electron-store');

const store = new Store();

export default function Modal() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);

  const todoLength = monthTodos.length;

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

  const { cursor, buttonCursor } = useCursor(monthTodos, {
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo
  });

  useEffect(() => {
    const todosFromStorage = store.get('todo.2020/04') ?? [];
    setMonthTodos(todosFromStorage.reverse());
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

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
