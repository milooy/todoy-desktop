import React from 'react';
import styled from 'styled-components';

interface Prop {
  text: string;
  timestamp: number;
  isDone: boolean;
  isActive: boolean;
  buttonCursor: 0 | 1 | 2;
  onRemove: (timestamp: number) => void;
  onToggleTodo: (timestamp: number) => void;
}

export default function TodoItem({
  text,
  timestamp,
  isDone,
  isActive,
  buttonCursor,
  onRemove,
  onToggleTodo
}: Prop) {
  const getButtonActive = (buttonNum: 0 | 1 | 2) =>
    isActive && buttonCursor === buttonNum;

  return (
    <Container isActive={isActive}>
      <Input value={text} isDone={isDone} />
      <Button isActive={getButtonActive(0)}>Later</Button>
      <Button isActive={getButtonActive(1)} onClick={() => onRemove(timestamp)}>
        Remove
      </Button>
      <Button
        isActive={getButtonActive(2)}
        onClick={() => onToggleTodo(timestamp)}
      >
        Done
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
  margin-bottom: 6px;
  padding: 5px 9px;
  display: flex;
  border: 4px solid
    ${({ isActive }: ActiveOrNot) => (isActive ? '#ffb87b' : 'transparent')};
  background: ${({ isActive }: ActiveOrNot) =>
    isActive ? '#FFDA02' : 'inherit'};
`;

const Button = styled.button`
  background: ${({ isActive }: ActiveOrNot) =>
    isActive ? '#258ef3' : 'inherit'};
  font-weight: bold;
  border: none;
`;
const Input = styled.input`
  font-size: 25px;
  border: none;
  flex: 1;
  background: transparent;
  text-decoration: ${({ isDone }: DoneOrNot) =>
    isDone ? 'line-through' : 'inherit'};
  color: ${({ isDone }: DoneOrNot) => (isDone ? 'gray' : 'inherit')};
`;
