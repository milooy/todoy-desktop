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

export default function Home() {
  const {
    monthTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit
  } = useTodo();

  const { cursor, buttonCursor } = useCursor(monthTodos, {
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo
  });

  return (
    <div className={styles.container} data-tid="container">
      <h2>Spotodo</h2>
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
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
