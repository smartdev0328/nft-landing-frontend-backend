import React from 'react';
import styled from 'styled-components';
import Clock from '../../components/icons/Clock';

const Container = styled.div`
  width: 239px;
  height: 37px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;
const Card = styled.div`
  padding: 5px 4px;
  background-color: #12151f;
  color: white;
  font-size: 15px;
  border-radius: 2px;
  margin: 0px 3px;
`;

export default function Timer({ day = 13, hour = 14, min = 45 }) {
  return (
    <Container>
      <Clock></Clock>
      <div style={{ fontSize: '15px', color: 'white', marginLeft: '3px' }}>Start sale in:</div>
      <Card>{day}D</Card>
      <Card>{hour}H</Card>
      <Card>{min}M</Card>
    </Container>
  );
}
