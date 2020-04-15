import { useState, useEffect } from 'react';
import { Todo } from '../types';

const Store = require('electron-store');

const store = new Store();

export default function useTodo() {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const todosFromStorage = store.get('todo.2020/04') ?? [];
    setMonthTodos(todosFromStorage.reverse());
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
    setMonthTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit
  };
}
