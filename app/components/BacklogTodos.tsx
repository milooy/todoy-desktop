import React from 'react';
import styled from 'styled-components';
import { TodoContext } from '../hooks/useTodoContext';
import { CursorContext } from '../hooks/useCursor';

import TodoItem from './TodoItem';
import { Today } from './styled';

export default function BacklogTodos({
  todoContext,
  cursorContext
}: {
  todoContext: TodoContext;
  cursorContext: CursorContext;
}) {
  const {
    backlogTodos,
    handleRemove,
    handleToggleTodo,
    handleMoveToToday,
    handleUpdateTodo
  } = todoContext;
  const { cursor, buttonCursor, todoTypeCursor } = cursorContext;
  const isCursorToday = todoTypeCursor === 0;

  return (
    <Container>
      <Today>Backlog</Today>
      {backlogTodos.map((todo, index) => {
        return (
          <>
            <TodoItem
              isActive={cursor === index && !isCursorToday}
              buttonCursor={buttonCursor}
              onRemove={handleRemove}
              onToggleTodo={handleToggleTodo}
              onMoveToToday={handleMoveToToday}
              onUpdateTodo={handleUpdateTodo}
              key={todo.timestamp}
              text={todo.text}
              timestamp={todo.timestamp}
              isDone={todo.isDone}
              isBacklog
            />
          </>
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  overflow-y: auto;
  flex: 2;
`;
