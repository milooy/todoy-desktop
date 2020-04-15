import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Store from 'electron-store';
import { Todo } from '../types';

const store = new Store();
const dateFormatter = (timestamp: number) =>
  dayjs(timestamp).format('MM-D-YYYY');
const STORE_KEY_BY_MONTH = `todo.${dayjs().format('YYYY/MM')}`;
const STORE_KEY_BY_BACKLOGS = 'todo.backlogs';

export interface TodoContext {
  monthTodos?: Todo[];
  todayTodos: Todo[];
  handleRemove: (timestamp: number) => void;
  handleToggleTodo: (timestamp: number) => void;
  handleSubmit: (value: string) => void;
  handleMoveToBacklog: (value: string, timestamp: number) => void;

  // Backlog
  handleSubmitBacklog: (value: string) => void;
  handleMoveToToday: (value: string, timestamp: number) => void;
  backlogTodos?: Todo[];
}

export default function useTodoContext(): TodoContext {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [backlogTodos, setBacklogTodos] = useState<Todo[]>([]);
  const todayTodos = monthTodos.filter(todo => {
    return dateFormatter(todo.timestamp) === dateFormatter(+new Date());
  });

  useEffect(() => {
    const todosFromStorage = store.get(STORE_KEY_BY_MONTH) ?? [];
    const backlogTodosFromStorage = store.get(STORE_KEY_BY_BACKLOGS) ?? [];
    setMonthTodos(todosFromStorage);
    setBacklogTodos(backlogTodosFromStorage);
    // store.delete(STORE_KEY_BY_MONTH); // 리셋하고 싶다면!
  }, []);

  // TODO: 중복 제거
  const handleRemove = (timestamp: number, isBacklog?: boolean) => {
    const selectedTodos = isBacklog ? backlogTodos : monthTodos;
    const updatedTodos: Todo[] = selectedTodos.filter(
      item => item.timestamp !== timestamp
    );

    if (isBacklog) {
      setBacklogTodos(updatedTodos);
      store.set(STORE_KEY_BY_BACKLOGS, updatedTodos);
    } else {
      setMonthTodos(updatedTodos);
      store.set(STORE_KEY_BY_MONTH, updatedTodos);
    }
  };

  const handleToggleTodo = (timestamp: number, isBacklog?: boolean) => {
    const selectedTodos = isBacklog ? backlogTodos : monthTodos;
    const updatedTodos: Todo[] = selectedTodos.map(item => {
      if (item.timestamp === timestamp) {
        const updatedItem = item;
        updatedItem.isDone = !item.isDone;
        return updatedItem;
      }
      return item;
    });

    if (isBacklog) {
      setBacklogTodos(updatedTodos);
      store.set(STORE_KEY_BY_BACKLOGS, updatedTodos);
    } else {
      setMonthTodos(updatedTodos);
      store.set(STORE_KEY_BY_MONTH, updatedTodos);
    }
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
    store.set(STORE_KEY_BY_MONTH, updatedMonthTodos);
  };

  const handleSubmitBacklog = (text: string) => {
    const updatedBacklogTodos: Todo[] = [
      {
        timestamp: +new Date(),
        text,
        isDone: false
      },
      ...backlogTodos
    ];
    setBacklogTodos(updatedBacklogTodos);
    store.set(STORE_KEY_BY_BACKLOGS, updatedBacklogTodos);
  };

  const handleMoveToToday = (text: string, timestamp: number) => {
    handleSubmit(text);
    handleRemove(timestamp, true);
  };

  const handleMoveToBacklog = (text: string, timestamp: number) => {
    handleSubmitBacklog(text);
    handleRemove(timestamp);
  };

  return {
    monthTodos,
    todayTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit,
    handleMoveToBacklog,

    // Backlog
    handleSubmitBacklog,
    backlogTodos,
    handleMoveToToday
  };
}
