import React from 'react';
import dayjs from 'dayjs';
import { TodoContext } from '../hooks/useTodoContext';
import { CursorContext } from '../hooks/useCursor';
import { Today } from './styled';
import TodoItem from './TodoItem';

let cachedPrevDate: string | null = null;

export default function MonthTodos({
  todoContext,
  cursorContext
}: {
  todoContext: TodoContext;
  cursorContext: CursorContext;
}) {
  const { monthTodos, handleRemove, handleToggleTodo } = todoContext;
  const { cursor, buttonCursor, todoTypeCursor } = cursorContext;
  const isCursorToday = todoTypeCursor === 0;

  return (
    <div>
      {monthTodos.map((todo, index) => {
        const date = dayjs(todo.timestamp).format('dddd, MMM D, YYYY');
        const renderedDate = date === cachedPrevDate ? '' : date;
        cachedPrevDate = date;
        return (
          <>
            <Today>{renderedDate}</Today>
            <TodoItem
              isActive={cursor === index && isCursorToday}
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
