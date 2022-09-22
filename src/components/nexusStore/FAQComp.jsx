import React from 'react';
import styled from 'styled-components';
import AccordianComp from './AccordianComp';

const Container = styled.div`
  width: 100%;
  padding: 74px 0px;
  background-color: #1f222f;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FAQComp() {
  const faqs = [
    {
      question: 'Can the purchased eggs be sold immediately on Opensea?',
      answer: 'Yes they can.'
    },
    {
      question: 'Where can I see my purchased NFTs?',
      answer: 'Inside your account inventory'
    },
    {
      question: 'What do I need to prepare to participate in the NFT sale?',
      answer:
        'You will need to prepare the required FYN for purchase, as well as some Polygon network MATIC in your wallet to cover the transaction gas fees. It is recommended to have at lease 1 MATIC in your wallet.'
    },
    {
      question: 'How many Buddies can I buy per account?',
      answer: 'Each person can purchase up to a maximum of one.'
    },
    {
      question: 'How many types of Buddies will be on sale?',
      answer: '4 types: Pigasus, Gagamaru, Chukwa, Lapis'
    },
    {
      question: 'Where do I make the purchase?',
      answer: 'The sale will be conducted on the official Affyn website.'
    }
  ];
  return (
    <Container>
      <div style={{ width: '1157px', color: 'white', fontSize: '48px', fontWeight: 'bolder' }}>
        FAQ
      </div>
      {faqs.map((faq, index) => {
        return <AccordianComp {...faq} key={index}></AccordianComp>;
      })}
    </Container>
  );
}
