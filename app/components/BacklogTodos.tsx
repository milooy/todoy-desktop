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
  const { cursor, buttonCursor } = cursorContext;

  return (
    <div>
      {backlogTodos.map((todo, index) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
}
