import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 30px;
`;
const ItemImage = styled.img`
  width: fit-content;
  height: fit-content;
`;
const Button = styled.div`
  background-image: url('/assets/images/nexus_store/button_back.png');
  background-size: cover;
  background-position: center;
  width: 160px;
  height: 63px;
  margin-top: -12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Title = styled.div`
  color: #834503;
  font-size: 12px;
`;
const Name = styled.div`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

export default function BuddyItem({
  type = 'yellow',
  availableAmount = 100,
  name = 'floomph',
  callback = () => {}
}) {
  return (
    <Container>
      <ItemImage src={'/assets/images/nexus_store/' + type + '.png'}></ItemImage>
      <Button onClick={() => callback(name)}>
        <Title>Available: {availableAmount}</Title>
        <Name>{name}</Name>
      </Button>
    </Container>
  );
}
