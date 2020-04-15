import { useState, useEffect } from 'react';
import useKeyPress from './useKeyPress';

export interface CursorContext {
  cursor: number;
  buttonCursor: number;
}

export default function useCursor(
  targetArray: any[],
  {
    onPushRemove,
    onPushToggleTodo
  }: {
    onPushRemove: (timestamp: number) => void;
    onPushToggleTodo: (timestamp: number) => void;
  }
) {
  const [cursor, setCursor] = useState(-1);
  const [buttonCursor, setButtonCursor] = useState<number>(2);

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
      setButtonCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
    if (rightPress) {
      setButtonCursor(prevState => (prevState < 2 ? prevState + 1 : prevState));
    }
    if (enterPress) {
      const todo = targetArray[cursor];
      if (todo === undefined) {
        return;
      }
      /** Handle Remove Button */
      if (buttonCursor === 1) {
        onPushRemove(todo.timestamp);
      }
      /** Handle Done Button */
      if (buttonCursor === 2) {
        onPushToggleTodo(todo.timestamp);
      }
    }
  }, [downPress, upPress, leftPress, rightPress, enterPress]);

  return { cursor, buttonCursor };
}
