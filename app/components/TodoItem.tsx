import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Todo } from '../types';

export default function TodoItem({ text, timestamp, isDone, isActive }) {
  const [monthTodos, setMonthTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Container isActive={isActive}>
      <Input value={text} />
      <button>Later</button>
      <button>Remove</button>
      <button>Done</button>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px;
  padding: 12px;
  display: flex;
  border: 1px solid #d6d6d6;
  background: ${({ isActive }) => (isActive ? 'gray' : 'inherit')};
`;

const Form = styled.form`
  display: flex;
  background: #e6e5e5;
  padding: 12px;
`;
const Input = styled.input`
  font-size: 25px;
  border: none;
  flex: 1;
`;
