import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: rgba(35, 39, 52, 1);
  border-radius: 20px;
  border: 1px solid rgba(58, 63, 79, 1);
`;
const Image = styled.img`
  width: fit-content;
  height: fit-content;
`;

export default function AssetInfo({ imgUrl, type, amount }) {
  return (
    <Container>
      <Image src={imgUrl}></Image>
      <div style={{ marginTop: '27px' }}>{amount + ' ' + type}</div>
    </Container>
  );
}
