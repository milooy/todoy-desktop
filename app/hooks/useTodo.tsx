import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Todo } from '../types';

const Store = require('electron-store');

const store = new Store();
const dateFormatter = (timestamp: number) =>
  dayjs(timestamp).format('MM-D-YYYY');

export default function useTodo() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const todayTodos = monthTodos.filter(todo => {
    return dateFormatter(todo.timestamp) === dateFormatter(+new Date());
  });

  useEffect(() => {
    const todosFromStorage = store.get('todo.2020/04') ?? [];
    setMonthTodos(todosFromStorage);
    // store.delete('todo.2020/04'); // 리셋하고 싶다면!
  }, []);

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

  const handleSubmit = (value: string) => {
    const updatedMonthTodos: Todo[] = [
      {
        timestamp: +new Date(),
        // timestamp: 1586603084000,
        text: value,
        isDone: false
      },
      ...monthTodos
    ];
    setMonthTodos(updatedMonthTodos);
    store.set('todo.2020/04', updatedMonthTodos);
  };

  return {
    monthTodos,
    todayTodos,
    setMonthTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit
  };
}
