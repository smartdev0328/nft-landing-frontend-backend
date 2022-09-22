import React from 'react';
import styled from 'styled-components';
import AccountInfo from './AccountInfo';
import AssetInfo from './AssetInfo';

const Container = styled.div`
  background-color: red;
  width: calc(100% - 370px);
  padding-left: 90px;
  padding-top: 204px;
  color: white;
  background-color: rgba(35, 39, 52, 1);
  height: calc(100vh - 204px);
  overflow-y: auto;
`;
const FlexRow = styled.div`
  display: flex;
`;

export default function Account() {
  return (
    <Container>
      <AccountInfo></AccountInfo>
      <div style={{ marginBottom: '77px' }}></div>
      <FlexRow>
        <AssetInfo amount={0} imgUrl="/assets/images/Buddy-icon.png" type={'buddies'}></AssetInfo>
        <div style={{ marginLeft: '60px' }}></div>
        <AssetInfo amount={'100,000'} imgUrl="/assets/images/FYN-Icon.png" type={'fyn'}></AssetInfo>
      </FlexRow>
    </Container>
  );
}
