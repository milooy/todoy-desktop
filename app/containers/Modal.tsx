import React, { useState } from 'react';
import styled from '@emotion/styled';

export default function Modal() {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    // console.log('save', value);
    // setMonthTodos([
    //   ...monthTodos,
    //   {
    //     timestamp: +new Date(),
    //     text: value,
    //     isDone: false
    //   }
    // ]);
    // store.set('todo.2020/04', monthTodos);
    setValue('');
    // console.log(store.get('todo'));
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <ModalWrapper>
      <Form>
        <Input type="text" onChange={handleChange} value={value} autoFocus />
        <button onClick={handleSubmit} type="submit">
          저장
        </button>
      </Form>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.main`
  background: white;
  box-shadow: rgba(23, 25, 29, 0.05) 0 6px 25px;
  margin: 10px;
  padding: 12px;
  border: 1px solid #ececec;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  background: #e6e5e5;
  padding: 12px;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 25px;
`;
