import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TodoItem from '../components/TodoItem';
import useCursor from '../hooks/useCursor';
import TodoInput from '../components/TodoInput';
import useTodo from '../hooks/useTodoContext';
import { Today } from '../components/styled';

export default function Modal() {
  const {
    todayTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit,
    handleSubmitBacklog,
    handleMoveToBacklog,
    handleMoveToToday
  } = useTodo();

  const { cursor, buttonCursor, todoTypeCursor } = useCursor({
    todayTodos,
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo,
    onMoveToBacklog: handleMoveToBacklog,
    onMoveToToday: handleMoveToToday
  });

  return (
    <ModalWrapper>
      <TodoInput
        cursor={cursor}
        todoTypeCursor={todoTypeCursor}
        onSubmitMonthTodo={handleSubmit}
        onSubmitBacklogTodo={handleSubmitBacklog}
      />
      <Today>{dayjs().format('dddd, MMM D, YYYY')}</Today>
      <div>
        {todayTodos.map((todo, index) => (
          <TodoItem
            isActive={cursor === index}
            buttonCursor={buttonCursor}
            onRemove={handleRemove}
            onToggleTodo={handleToggleTodo}
            onMoveToBacklog={handleMoveToBacklog}
            key={todo.timestamp}
            text={todo.text}
            timestamp={todo.timestamp}
            isDone={todo.isDone}
          />
        ))}
      </div>
      <SeeMore isActive={cursor === todayTodos.length}>See more</SeeMore>
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

const SeeMore = styled.div`
  padding: 5px;
  text-align: center;
  background: ${({ isActive }: { isActive: boolean }) =>
    isActive ? '#FFDA02' : 'inherit'};
`;
