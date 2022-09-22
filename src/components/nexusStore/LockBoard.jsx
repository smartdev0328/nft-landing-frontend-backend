import React from 'react';
import styled from 'styled-components';
import Lock from '../../components/icons/Lock';

const Container = styled.div`
  width: 1309px;
  height: 489.5px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
`;
const Text = styled.div`
  margin-top: 8px;
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

export default function LockBoard({ locked }) {
  return (
    locked && (
      <Container>
        <Lock></Lock>
        <Text>Please login account to purchase your buddy</Text>
      </Container>
    )
  );
}
