import React from 'react';
import styled from 'styled-components';
import Confirm from '../../components/icons/Confirm';
import Metamask from '../../components/icons/Metamask';

const Container = styled.div``;
const Title = styled.div`
  font-size: 12px;
  color: #a2add0;
  margin-bottom: 6px;
`;
const DecorFlexRow = styled.div`
  width: 465px;
  padding: 14px 18px 12px 16px;
  border-radius: 10px;
  background-color: #1e2333;
  border: 1px solid #3a3f4f;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Account = styled.div`
  font-size: 18px;
  color: #a2add0;
`;

export default function WalletInfo({ account }) {
  return (
    <Container>
      <Title>Wallet</Title>
      <DecorFlexRow>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Metamask></Metamask>
          <div style={{ marginLeft: '20px' }}></div>
          <Account>{account}</Account>
          <Confirm></Confirm>
        </div>
      </DecorFlexRow>
    </Container>
  );
}
