import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from './styled';

interface Prop {
  cursor: number;
  todoTypeCursor: number;
  onSubmitMonthTodo: (value: string) => void;
  onSubmitBacklogTodo: (value: string) => void;
}

export default function TodoInput({
  cursor,
  todoTypeCursor,
  onSubmitMonthTodo,
  onSubmitBacklogTodo
}: Prop) {
  const [value, setValue] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  const isCursorInInput = cursor === -1;
  const isCursorToday = todoTypeCursor === 0;

  useEffect(() => {
    if (!inputEl.current) {
      return;
    }
    if (isCursorInInput) {
      inputEl.current.focus();
    } else {
      inputEl.current.blur();
    }
  }, [cursor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value === '') {
      return;
    }
    if (isCursorToday) {
      onSubmitMonthTodo(value);
    } else {
      onSubmitBacklogTodo(value);
    }
    setValue('');
  };

  return (
    <Container isActive={isCursorInInput}>
      <Input
        type="text"
        onChange={handleChange}
        value={value}
        ref={inputEl}
        placeholder="What are you up to?"
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <Button
        onClick={handleSubmit}
        isActive={isCursorInInput && isCursorToday}
      >
        Today
      </Button>
      <Button
        onClick={handleSubmit}
        type="LATER"
        isActive={isCursorInInput && !isCursorToday}
      >
        Later
      </Button>
    </Container>
  );
}

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 25px;
  caret-color: white;
  color: white;

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  padding: 5px 9px;
  border-bottom: 1px solid #76757a;
  padding: 12px;
`;
