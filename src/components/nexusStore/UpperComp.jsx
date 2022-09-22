import React from 'react';
import styled from 'styled-components';
import { FynContext } from '../../context/FynContext';
import BuddyItem from './BuddyItem';
import LockBoard from './LockBoard';
import Timer from './Timer';
import Cookies from 'universal-cookie';

const Container = styled.div`
  width: 100%;
  padding-top: 145px;
  padding-bottom: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111137;
`;
const Stage = styled.div`
  width: 1309px;
  height: 490px;
  background-image: url('/assets/images/FirstCollectionSale-banner.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
`;
const FlexRow = styled.div`
  display: flex;
  align-items: center;
  z-index: 0;
`;
const Card = styled.div`
  width: 276px;
  height: 367px;
  background-color: #10131b;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Image = styled.img`
  width: fit-content;
  height: fit-content;
`;
const ArrowImage = styled.img`
  width: fit-content;
  height: fit-content;
`;

export default function UpperComp() {
  const [lock, setLock] = React.useState(true);
  const cookies = new Cookies();
  const { setBuddyModalOpen, setBuddyInfo } = React.useContext(FynContext);
  const buddyInfo = {
    pigasus: {
      type: 'pigasus',
      content: [
        'Pigasi (plural), like bumblebees, defy all known laws of aviation with their tiny wings somehow keeping them afloat.',
        'Opportunistic omnivores, they hover from tree to tree, gorging on fruits until they become too heavy to fly and retire for the day. They are also quick to startle, and will flee instantly with voluminous propelling fart.'
      ]
    },
    nessie: {
      type: 'nessie',
      content: [
        'Amphibious dragons with startling swimming speeds.',
        'They are territorial, lone hunters, and can somehow designate territory boundaries in the deep ocean alongside other Nessies.',
        'Against larger threats or schools of prey, they are also able to strategise and collaborate on the fly, signifying impressive degrees of intelligence. They are the unparalleled apex predators of the NEXUS sea.',
        'On land, however they are as docile as dogs! Perhaps their confidence in their lethality allows them to approach other species without fear.'
      ]
    },
    gagamaru: {
      type: 'gagamaru',
      content: [
        'A playful ape-like species that hatch from eggs and live in trees.',
        'Weak while young, they continue to wear the bottom half of the egg shell to protect themselves from predators that attack from below. The egg peels off fully by the time they become adults, when they are able to protect themselves with their powerful arm strength.',
        'They form tight-knit family tribes and are often seen together. They have shown to have great intelligence, communication and problem-solving skills. They communicate in the form of facial expressions, gestures and various vocalisations.'
      ]
    },
    floomph: {
      type: 'floomph',
      content: [
        'A round mammal with an impenetrable hide.',
        'Their bodies are pliable and elastic, able to retain almost 98% of kinetic energy, allowing them to squash and stretch limitlessly and bounce about ferociously. With a powerful enough launch, they can continue bouncing in a straight line at the speed of a car.',
        'They look cuddly, but they are most definitely not. At least, on first few meetings. They are very mindful of personal space and can be quite aggressive against new faces. They are also very protective of their pack.'
      ]
    }
  };
  const items = [
    {
      type: 'red',
      availableAmount: 100,
      name: 'floomph'
    },
    {
      type: 'purple',
      availableAmount: 100,
      name: 'nessie'
    },
    {
      type: 'green',
      availableAmount: 100,
      name: 'gagamaru'
    },
    {
      type: 'yellow',
      availableAmount: 100,
      name: 'pigasus'
    }
  ];
  React.useEffect(() => {
    const userInfo = cookies.get('user');
    if (userInfo) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [setLock]);
  React.useEffect(() => {
    //console.log('lock status: ', lock);
  }, [lock]);

  const handleBuddyModal = (buddyType) => {
    setBuddyModalOpen(true);
    setBuddyInfo(buddyInfo[buddyType]);
  };
  return (
    <Container>
      <div
        style={{ textTransform: 'uppercase', fontSize: '48px', color: 'white', fontWeight: 'bold' }}
      >
        Nexus Store
      </div>
      <div style={{ fontSize: '18px', color: 'white', marginTop: '23px' }}>
        Get your 1st collector’s edition Buddies egg while egg last.
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'white',
          alignItems: 'center',
          marginTop: '8px',
          marginBottom: '18px'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32.541"
          height="28.928"
          viewBox="0 0 32.541 28.928"
        >
          <g id="FYN-icon" transform="translate(-809 -242.387)">
            <path
              id="Path_4527"
              data-name="Path 4527"
              d="M706.453,5097.035l-13.518-20.705-16.047,28.928h32.541l-7.675-3.789H683.083l9.852-16.793,5.68,9.053-8.184,3.886Z"
              transform="translate(132.112 -4833.943)"
              fill="#fff"
            />
          </g>
        </svg>
        2,995 FYN($209.85)
      </div>
      <Stage>
        <LockBoard locked={lock}></LockBoard>
        <Timer></Timer>
        <div style={{ marginTop: '99.7px' }}></div>
        <FlexRow>
          {items.map((item, index) => {
            return <BuddyItem {...item} key={index} callback={handleBuddyModal}></BuddyItem>;
          })}
        </FlexRow>
      </Stage>
      <div style={{ marginTop: '42.5px' }}></div>
      <FlexRow>
        <Card>
          <Image src="/assets/images/nexus_store/Nex-icon.png"></Image>
          <div
            style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              maxWidth: '164px',
              textAlign: 'center'
            }}
          >
            Buy your Buddy egg at NEXUS Store
          </div>
          <div
            style={{ fontSize: '18px', color: '#A2ADD0', maxWidth: '176px', textAlign: 'center' }}
          >
            *Each wallet can only purchase up to 1 Buddy
          </div>
        </Card>
        <ArrowImage src="/assets/images/nexus_store/Arrow.png"></ArrowImage>
        <Card>
          <Image src="/assets/images/nexus_store/Egg-icon.png"></Image>
          <div
            style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              maxWidth: '114px',
              textAlign: 'center'
            }}
          >
            100% to get a rare Buddy
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#A2ADD0',
              maxWidth: '247px',
              height: '76px',
              textAlign: 'center',
              borderRadius: '10px',
              border: '1px dashed #707070',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Upon purchase the egg will be hatched within a few days
          </div>
        </Card>
        <ArrowImage src="/assets/images/nexus_store/Arrow.png"></ArrowImage>
        <Card>
          <Image src="/assets/images/nexus_store/Buddy(placeholder).png"></Image>
          <div
            style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              maxWidth: '196px',
              textAlign: 'center'
            }}
          >
            4 types of rare Buddies
          </div>
          <div
            style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: 'bold',
              maxWidth: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <div>- Pigasus</div>
            <div>- Gagamaru</div>
            <div>- Nessie</div>
            <div>- Floomph</div>
          </div>
        </Card>
      </FlexRow>
    </Container>
  );
}
