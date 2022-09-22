import React, { FC } from 'react';
import Heading from 'components/Heading/Heading';

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: '1',
    heading: 'Can the purchased eggs be sold in OpenSea?',
    subHeading: 'Yes, almost immediately upon purchase!'
  },
  {
    id: '2',
    heading: 'Where can I see my purchased NFTs?',
    subHeading: 'You can find them inside your account inventory and also view them in your OpenSea collection.'
  },
  {
    id: '3',
    heading: 'What do I need to prepare for my NFT sale?',
    subHeading:
      'You will need to prepare the required FYN for purchase, as well as some Polygon network MATIC in your wallet to cover the transaction gas fees. It is recommended to have at least 1 MATIC in your wallet.'
  },
  {
    id: '4',
    heading: 'How many buddies can I buy per account?',
    subHeading: 'Each person can purchase up to a maximum of one.'
  },
  {
    id: '5',
    heading: 'How many types of buddies will be on sale?',
    subHeading: '4 Types: Pigasus, Nessie, Gagamaru, Floomph'
  },
  {
    id: '6',
    heading: 'Where do I make the purchase?',
    subHeading:
      'The sale will be conducted on the official Affyn marketplace (marketplace.affyn.com)'
  }
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = '' }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        isCenter
        desc="Some quick responses to your immediate queries. Check with support or join us in discord to talk to us and find out more.">
        🚀 Frequently Asked Questions
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-200 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
