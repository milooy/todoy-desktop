import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';

export default function TodoItem({
  text,
  timestamp,
  isDone,
  isActive,
  buttonCursor,
  onRemove,
  onToggleTodo
}) {
  const getButtonActive = buttonNum => isActive && buttonCursor === buttonNum;
  console.log({ text, isDone });

  return (
    <Container isActive={isActive} isDone={isDone}>
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

const Container = styled.div`
  margin-bottom: 6px;
  padding: 5px 9px;
  display: flex;
  border: 4px solid ${({ isActive }) => (isActive ? '#ffb87b' : 'transparent')};
  background: ${({ isActive }) => (isActive ? '#FFDA02' : 'inherit')};
`;

const Button = styled.button`
  background: ${({ isActive }) => (isActive ? '#258ef3' : 'inherit')};
  font-weight: bold;
  border: none;
`;
const Input = styled.input`
  font-size: 25px;
  border: none;
  flex: 1;
  background: transparent;
  text-decoration: ${({ isDone }) => (isDone ? 'line-through' : 'inherit')};
  color: ${({ isDone }) => (isDone ? 'gray' : 'inherit')};
`;
