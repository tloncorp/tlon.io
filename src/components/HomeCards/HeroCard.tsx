import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import { urlForImage } from '../../utils/urlForImage';
import type { HomeCard } from '../../utils/types';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

interface HeroCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const backgroundImageUrl = props.media?.photo?.asset ? 
    urlForImage(props.media.photo)
      .url()
      + '?v=1'
    : '';

  return (
    <BaseCard {...props}>
      <div 
        className="cta-card bg-[#fff] h-full relative overflow-hidden" 
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`, 
          backgroundSize: 'contain',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex h-full flex-col justify-start p-6 md:p-12">
          <div className="mx-auto max-w-[600px] w-full">
            <h2 className="text-lg text-[#222] mb-4 font-medium tracking-tight text-center break-words">
              {props.headline}
            </h2>
            <h2 className="text-base text-[#666] mb-8 md:mb-12 font-normal tracking-tight text-center">
              {props.body}
            </h2>
            <div className="flex flex-row gap-2 md:gap-4 w-full justify-center">
              <a
                className="rounded-lg px-3 md:px-6 py-1.5 md:py-3 bg-[#E2E3E0] text-[#666] w-[140px] md:w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center justify-center md:justify-start"
                href="https://apps.apple.com/your-app-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-5 md:w-6 flex justify-center">
                  <FaApple className="text-lg md:text-2xl" />
                </div>
                <div className="ml-1.5 md:ml-4 md:flex-1 md:text-left">
                  <span className="hidden md:block text-xs">Download on the</span>
                  <span className="text-xs md:text-base font-semibold">
                    <span className="md:hidden">App Store</span>
                    <span className="hidden md:inline">App Store</span>
                  </span>
                </div>
              </a>
              <a
                className="rounded-lg px-3 md:px-6 py-1.5 md:py-3 bg-[#E2E3E0] text-[#666] w-[140px] md:w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center justify-center md:justify-start"
                href="https://play.google.com/store/your-play-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-5 md:w-6 flex justify-center">
                  <FaGooglePlay className="text-lg md:text-2xl" />
                </div>
                <div className="ml-1.5 md:ml-4 md:flex-1 md:text-left">
                  <span className="hidden md:block text-xs">Get it on</span>
                  <span className="text-xs md:text-base font-semibold">
                    <span className="md:hidden">Google Play</span>
                    <span className="hidden md:inline">Google Play</span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default HeroCard;