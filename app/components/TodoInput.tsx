import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isBacklog?: boolean
  ) => {
    e.preventDefault();
    if (value === '') {
      return;
    }
    if (isBacklog) {
      onSubmitBacklogTodo(value);
    } else {
      onSubmitMonthTodo(value);
    }
    setValue('');
  };

  return (
    <Form isActive={isCursorInInput}>
      <Input
        type="text"
        onChange={handleChange}
        value={value}
        ref={inputEl}
        placeholder="What are you up to?"
      />
      <Button
        onClick={handleSubmit}
        type="submit"
        isActive={isCursorInInput && isCursorToday}
      >
        Today
      </Button>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          handleSubmit(e, true);
        }}
        isActive={isCursorInInput && !isCursorToday}
      >
        Later
      </Button>
    </Form>
  );
}

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 25px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: ${({ isActive }: { isActive: boolean }) =>
    isActive ? '#258ef3' : 'inherit'};
  font-weight: bold;
  border: none;
`;

const Form = styled.form`
  display: flex;
  background: #e6e5e5;
  padding: 5px 9px;
  border: 4px solid
    ${({ isActive }: { isActive: boolean }) =>
      isActive ? '#ffb87b' : 'transparent'};
`;
