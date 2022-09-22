import React from 'react';
import styled from 'styled-components';
import BuddyModal from '../../components/modal/BuddyModal';
import { FynContext } from '../../context/FynContext';
import FAQComp from './FAQComp';
import UpperComp from './UpperComp';

const DiscordButton = styled.div`
  width: 175px;
  height: 120px;
  border-radius: 20px 20px 0px 0px;
  background-color: #494d5a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: -120px;
  margin-right: 20px;
  float: right;
  z-index: 3;
  position: relative;
`;
const DiscordImage = styled.img`
  width: fit-content;
  height: fit-content;
`;

export default function NexusStore() {
  const { setBuddyModalOpen, buddyModalOpen, buddyInfo } = React.useContext(FynContext);
  const onClose = () => {
    setBuddyModalOpen(false);
  };
  return (
    <React.Fragment>
      <UpperComp></UpperComp>
      <DiscordButton>
        <DiscordImage src="/assets/images/Discord-icon.png"></DiscordImage>
        <div style={{ color: 'white', fontSize: '14px' }}>Join our community</div>
      </DiscordButton>
      <FAQComp></FAQComp>
      <BuddyModal isOpen={buddyModalOpen} closeModal={onClose} buddyInfo={buddyInfo}></BuddyModal>
    </React.Fragment>
  );
}
