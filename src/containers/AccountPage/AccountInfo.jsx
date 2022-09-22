import { Twitter } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import Edit from '../../components/icons/Edit'
import Facebook from '../../components/icons/Facebook';
import Gmail from '../../components/icons/Gmail';
import IconInput from '../../components/input/IconInput';
import { editAddressString } from '../../pipeline/pipeline';
import BindAccount from './BindAccount';
import WalletInfo from './WalletInfo';
import Cookies from 'universal-cookie';

const Container = styled.div`
  width: 1103px;
  padding: 40px 110px 50px 40px;
  background-color: #242735;
  border-radius: 20px;
  border: 1px solid #3a3f4f;
`;
const SubContainer = styled.div`
  width: 500px;
  margin-top: -20px;
`;
const FlexRowBetween = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export default function AccountInfo() {
  const cookies = new Cookies();

  const [disabled, setDisabled] = React.useState(true);
  //const email = JSON.parse(cookies.get('user')).email;
  //const password = JSON.parse(cookies.get('user')).password;
  //const signUpMethod = JSON.parse(cookies.get('user')).signUpMethod;
  //const wallet = JSON.parse(cookies.get('user')).wallet;

  const email = cookies.get('user').email;
  const password = cookies.get('user').password;
  const signUpMethod = cookies.get('user').signUpMethod;
  const wallet = cookies.get('user').wallet;
  return (
    <Container>
      <FlexRowBetween>
        <IconInput type="email" label="Email" value={email} disabled={true}></IconInput>
        <div style={{ marginBottom: '40px' }}></div>
        <SubContainer>
          <div style={{ fontSize: '12px', color: '#A2ADD0', marginBottom: '9px' }}>
            Bind account
          </div>
          <FlexRow>
            <BindAccount
              providerIcon={<Facebook></Facebook>}
              active={signUpMethod === 'facebook' ? 'true' : 'false'}
            ></BindAccount>
            <div style={{ marginLeft: '20px' }}></div>
            <BindAccount
              providerIcon={<Gmail></Gmail>}
              active={signUpMethod === 'google' ? 'true' : 'false'}
            ></BindAccount>
            <div style={{ marginLeft: '20px' }}></div>
            <BindAccount
              providerIcon={<Twitter></Twitter>}
              active={signUpMethod === 'twitter' ? 'true' : 'false'}
            ></BindAccount>
          </FlexRow>
        </SubContainer>
      </FlexRowBetween>
      <div style={{ marginTop: '40px' }}></div>
      <FlexRowBetween>
        <IconInput
          iconComp={<Edit></Edit>}
          type="password"
          label="Password"
          description={'Contains at least 8 characters, one letter and one number.'}
          disabled={disabled}
          callback={setDisabled}
          value={password}
        ></IconInput>
        <div style={{ marginTop: '-40px' }}>
          <WalletInfo account={editAddressString(wallet)}></WalletInfo>
        </div>
      </FlexRowBetween>
    </Container>
  );
}
