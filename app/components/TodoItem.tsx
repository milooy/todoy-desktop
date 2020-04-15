import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './styled';

interface Prop {
  text: string;
  timestamp: number;
  isDone: boolean;
  isActive: boolean;
  isBacklog?: boolean;
  buttonCursor: number;
  onRemove: (timestamp: number, isBacklog: boolean) => void;
  onToggleTodo: (timestamp: number, isBacklog: boolean) => void;
  onMoveToToday?: (value: string, timestamp: number) => void;
  onMoveToBacklog: (value: string, timestamp: number) => void;
  onUpdateTodo: (value: string, timestamp: number, isBacklog: boolean) => void;
}

export default function TodoItem({
  text,
  timestamp,
  isDone,
  isActive,
  buttonCursor,
  onRemove,
  onToggleTodo,
  onMoveToToday,
  onMoveToBacklog,
  onUpdateTodo,
  isBacklog = false
}: Prop) {
  const getButtonActive = (buttonNum: 0 | 1 | 2) =>
    isActive && buttonCursor === buttonNum;

  const [value, setValue] = useState(text);
  const handleChange = e => {
    setValue(e.target.text);
  };

  const handleBlur = e => {
    onUpdateTodo(e.target.value, timestamp, isBacklog);
  };

  return (
    <Container isActive={isActive}>
      <Input
        // value={`✓ ${value}`}
        value={`${value}`}
        isDone={isDone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        type="LATER"
        isActive={getButtonActive(0)}
        onClick={() =>
          isBacklog
            ? onMoveToToday(text, timestamp)
            : onMoveToBacklog(text, timestamp)
        }
      >
        {isBacklog ? 'Today' : 'Later'}
      </Button>
      <Button
        type="REMOVE"
        isActive={getButtonActive(1)}
        onClick={() => onRemove(timestamp, isBacklog)}
      >
        Remove
      </Button>
      <Button
        type="DONE"
        isActive={getButtonActive(2)}
        onClick={() => onToggleTodo(timestamp, isBacklog)}
      >
        {isDone ? 'Redo' : 'Done'}
      </Button>
    </Container>
  );
}

interface ActiveOrNot {
  isActive: boolean;
}
interface DoneOrNot {
  isDone: boolean;
}

const Container = styled.div`
  padding: 7px 9px;
  display: flex;
  background: ${({ isActive }: ActiveOrNot) =>
    isActive ? '#3A7CE7' : 'inherit'};
  align-items: center;
`;

const Input = styled.input`
  font-size: 22px;
  padding: 5px 12px;
  border: none;
  flex: 1;
  background: transparent;
  text-decoration: ${({ isDone }: DoneOrNot) =>
    isDone ? 'line-through' : 'inherit'};
  color: ${({ isDone }: DoneOrNot) => (isDone ? '#585858' : 'white')};
`;
