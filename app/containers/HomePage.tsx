import React from 'react';
import styled from 'styled-components';
import MonthTodos from '../components/MonthTodos';
import BacklogTodos from '../components/BacklogTodos';
import useTodoContext from '../hooks/useTodoContext';
import useCursor from '../hooks/useCursor';
import TodoInput from '../components/TodoInput';

export default function HomePage() {
  const todoContext = useTodoContext();
  const {
    monthTodos,
    backlogTodos,
    handleRemove,
    handleToggleTodo,
    handleSubmit,
    handleSubmitBacklog,
    handleMoveToBacklog,
    handleMoveToToday
  } = todoContext;

  // TODO: 커서 움직일때마다 rerender 확인
  const cursorContext = useCursor({
    monthTodos,
    backlogTodos,
    onPushRemove: handleRemove,
    onPushToggleTodo: handleToggleTodo,
    onMoveToBacklog: handleMoveToBacklog,
    onMoveToToday: handleMoveToToday
  });

  // TODO: Context 로 빼기
  return (
    <Background>
      {/* <Title>🔍Spotodo✅</Title> */}
      <Logo>
        {/* <img
          alt="logo"
          src="https://user-images.githubusercontent.com/3839771/79383175-b87dc800-7f9f-11ea-9a14-6a0413693f19.png"
        /> */}
        <Title>Keytodo</Title>
      </Logo>
      <TodoInput
        cursor={cursorContext.cursor}
        todoTypeCursor={cursorContext.todoTypeCursor}
        onSubmitMonthTodo={handleSubmit}
        onSubmitBacklogTodo={handleSubmitBacklog}
        style={{ borderTop: '1px solid #76757a' }}
      />
      <Container>
        <MonthTodos todoContext={todoContext} cursorContext={cursorContext} />
        <BacklogTodos todoContext={todoContext} cursorContext={cursorContext} />
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background: #34363a;
`;

const Container = styled.main`
  display: flex;
  top: 195px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #34363a;
`;

const Title = styled.h1`
  color: white;
  font-size: 60px;
  margin: 0;
`;
const Logo = styled.div`
  padding: 60px 10px 10px;
  display: flex;
  align-items: center;
  img {
    height: 54px;
    margin-right: 9px;
  }
`;
