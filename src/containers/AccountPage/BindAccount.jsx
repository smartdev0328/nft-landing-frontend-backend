import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: ${(props) => (props.active === 'true' ? 'none' : '1px solid #3A3F4F')};
  background-color: ${(props) => (props.active === 'true' ? 'transparent' : '#1E2333')};
  box-shadow: ${(props) => (props.active === 'true' ? 'none' : '0px 3px 6px #00000029')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function BindAccount({ providerIcon, active = '' }) {
  return <Container active={active}>{providerIcon}</Container>;
}
