import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1157px;
  border-bottom: 2px solid #3a3f4f;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 16px;
`;
const Question = styled.div`
  font-size: 22px;
  color: #8e7eff;
`;
const Content = styled.div`
  max-width: 996px;
  color: white;
  font-size: 18px;
  margin-bottom: 40px;
`;
const FoldButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const HorizontalLine = styled.div`
  width: 40px;
  height: 2px;
  background-color: white;
`;

export default function AccordianComp({ question, answer }) {
  return (
    <Container>
      <Header>
        <Question>{question}</Question>
        <FoldButton>
          <HorizontalLine></HorizontalLine>
        </FoldButton>
      </Header>
      <Content>{answer}</Content>
    </Container>
  );
}
