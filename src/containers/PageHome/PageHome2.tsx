import React from 'react';
import SectionHowItWork2 from 'components/SectionHowItWork/SectionHowItWork2';
import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { Helmet } from 'react-helmet';
import SectionHero2 from 'components/nexusStore/SectionHero2';
import SectionGridFeatureNFT2 from './SectionGridFeatureNFT2';
import SectionStatistic from './SectionStatistic';
//import authorBanner from 'images/nfts/0dash-Banner.png';
//import NcImage from 'shared/NcImage/NcImage';
function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Affyn.com | Marketplace App</title>
      </Helmet>
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative mt-12 mb-20 sm:mb-24 sm:mt-20 lg:mb-32">
        {/*<div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            containerClassName="absolute inset-0"
            src={authorBanner}
            className="object-cover w-full h-full"
          />
  </div>*/}
        {/* SECTION HERO */}
        <SectionHero2 />
        {/* SECTION */}

        <div id="egg_section" className="relative py-10 lg:py-15">
          <BackgroundSection
            id="egg_section_background"
            className="bg-neutral-200 dark:bg-black/20"
            tabIndex={-1}
          />
          <SectionGridFeatureNFT2 />
        </div>
        {/* SECTION 2 */}
        <SectionHowItWork2 className="mt-24 lg:mt-40 xl:mt-48" />
      </div>

      {/* SECTION LAERGE SLIDER */}
      <div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
          {/* SECTION FAQ */}
          <SectionStatistic />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
