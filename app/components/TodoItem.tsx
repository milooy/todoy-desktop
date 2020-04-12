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
  onRemove
}) {
  const getButtonActive = buttonNum => isActive && buttonCursor === buttonNum;

  return (
    <Container isActive={isActive}>
      <Input value={text} />
      <Button isActive={getButtonActive(0)}>Later</Button>
      <Button isActive={getButtonActive(1)} onClick={() => onRemove(timestamp)}>
        Remove
      </Button>
      <Button isActive={getButtonActive(2)}>Done</Button>
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
  background: ${({ isActive }) => (isActive ? 'blue' : 'inherit')};
`;
const Input = styled.input`
  font-size: 25px;
  border: none;
  flex: 1;
  background: transparent;
`;
