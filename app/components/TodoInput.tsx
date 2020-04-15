import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Prop {
  cursor: number;
  onSubmitValue: (value: string) => void;
}

export default function TodoInput({ cursor, onSubmitValue }: Prop) {
  const [value, setValue] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputEl.current) {
      return;
    }
    if (cursor === -1) {
      inputEl.current.focus();
    } else {
      inputEl.current.blur();
    }
  }, [cursor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (value === '') {
      return;
    }
    onSubmitValue(value);
    setValue('');
  };

  return (
    <Form isActive={cursor === -1}>
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
        isActive={value !== '' && cursor === -1}
      >
        Do it!
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
