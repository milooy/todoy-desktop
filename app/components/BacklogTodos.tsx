import React from 'react';
import { TodoContext } from '../hooks/useTodoContext';
import { CursorContext } from '../hooks/useCursor';

import TodoItem from './TodoItem';

export default function BacklogTodos({
  todoContext,
  cursorContext
}: {
  todoContext: TodoContext;
  cursorContext: CursorContext;
}) {
  const { backlogTodos, handleRemove, handleToggleTodo } = todoContext;
  const { cursor, buttonCursor, todoTypeCursor } = cursorContext;
  const isCursorToday = todoTypeCursor === 0;

  return (
    <div>
      {backlogTodos.map((todo, index) => {
        return (
          <>
            <TodoItem
              isActive={cursor === index && !isCursorToday}
              buttonCursor={buttonCursor}
              onRemove={handleRemove}
              onToggleTodo={handleToggleTodo}
              key={todo.timestamp}
              text={todo.text}
              timestamp={todo.timestamp}
              isDone={todo.isDone}
              isBacklog
            />
          </>
        );
      })}
    </div>
  );
}
