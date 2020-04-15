import { useState, useEffect } from 'react';
import useKeyPress from './useKeyPress';

export interface CursorContext {
  cursor: number;
  buttonCursor: number;
  todoTypeCursor: number;
}

export default function useCursor({
  monthTodos,
  backlogTodos,
  todayTodos,
  onPushRemove,
  onPushToggleTodo
}: {
  monthTodos: any[];
  backlogTodos: any[];
  todayTodos: any[];
  onPushRemove: (timestamp: number, isBacklog: boolean) => void;
  onPushToggleTodo: (timestamp: number, isBacklog: boolean) => void;
}) {
  const [cursor, setCursor] = useState(-1);
  const [buttonCursor, setButtonCursor] = useState<number>(2);
  const [todoTypeCursor, setTodoTypeCursor] = useState<number>(0);

  const isInInput = cursor === -1;
  const isBacklog = todoTypeCursor === 1;
  // todayTodos도 넣어야함
  const targetArray = todayTodos ?? (isBacklog ? backlogTodos : monthTodos);

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const enterPress = useKeyPress('Enter');

  const arrayLength = targetArray.length;

  useEffect(() => {
    if (arrayLength <= 0) {
      return;
    }
    if (downPress) {
      setCursor(prevState =>
        prevState < arrayLength ? prevState + 1 : prevState
      );
    }
    if (upPress) {
      setCursor(prevState => (prevState > -1 ? prevState - 1 : prevState));
    }
    if (leftPress) {
      if (isInInput) {
        setTodoTypeCursor(0);
      }
      setButtonCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    if (rightPress) {
      if (isInInput) {
        setTodoTypeCursor(1);
      }
      setButtonCursor(prevState => (prevState < 2 ? prevState + 1 : prevState));
    }
    if (enterPress) {
      const todo = targetArray[cursor];
      if (todo === undefined) {
        return;
      }
      /** Handle Remove Button */
      if (buttonCursor === 1) {
        onPushRemove(todo.timestamp, isBacklog);
      }
      /** Handle Done Button */
      if (buttonCursor === 2) {
        onPushToggleTodo(todo.timestamp, isBacklog);
      }
    }
  }, [downPress, upPress, leftPress, rightPress, enterPress]);

  return { cursor, buttonCursor, todoTypeCursor };
}
