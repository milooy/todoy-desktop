import React from 'react';
import styled from 'styled-components';
import MonthTodos from '../components/MonthTodos';
import BacklogTodos from '../components/BacklogTodos';
import useTodoContext from '../hooks/useTodoContext';
import useCursor from '../hooks/useCursor';
import TodoInput from '../components/TodoInput';

export default function HomePage() {
  const todoContext = useTodoContext();
  const {
    monthTodos,
    backlogTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit,
    handleSubmitBacklog
  } = todoContext;

  // TODO: 커서 움직일때마다 rerender 확인
  const cursorContext = useCursor({
    monthTodos,
    backlogTodos,
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo
  });

  // TODO: Context 로 빼기
  return (
    <div>
      <h2>Spotodo</h2>
      <TodoInput
        cursor={cursorContext.cursor}
        todoTypeCursor={cursorContext.todoTypeCursor}
        onSubmitMonthTodo={handleSubmit}
        onSubmitBacklogTodo={handleSubmitBacklog}
      />
      <Container>
        <MonthTodos todoContext={todoContext} cursorContext={cursorContext} />
        <BacklogTodos todoContext={todoContext} cursorContext={cursorContext} />
      </Container>
    </div>
  );
}

const Container = styled.main`
  display: flex;
`;
