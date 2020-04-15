import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import routes from '../constants/routes.json';
import styles from './Home.css';
import useTodo from '../hooks/useTodo';
import useCursor from '../hooks/useCursor';
import TodoInput from './TodoInput';
import { Today } from './styled';
import TodoItem from './TodoItem';

let cachedPrevDate: string | null = null;

export default function Home() {
  const {
    monthTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit
  } = useTodo();

  // TODO: 커서 움직일때마다 rerender 확인
  const { cursor, buttonCursor } = useCursor(monthTodos, {
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo
  });
  console.log({ monthTodos });

  return (
    <div className={styles.container} data-tid="container">
      <h2>Spotodo</h2>
      <TodoInput cursor={cursor} onSubmitValue={handleSubmit} />
      <div>
        {monthTodos.map((todo, index) => {
          const date = dayjs(todo.timestamp).format('dddd, MMM D, YYYY');
          console.log(todo.text, date, cachedPrevDate);
          const renderedDate = date === cachedPrevDate ? '' : date;
          cachedPrevDate = date;
          return (
            <>
              <Today>{renderedDate}</Today>
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
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
