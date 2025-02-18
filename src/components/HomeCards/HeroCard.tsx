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
  const desktopImageUrl = props.media?.photo?.asset ? 
    urlForImage(props.media.photo)
      .url()
      + '?v=1'
    : '';

  const mobileImageUrl = props.media?.mobilePhoto?.asset ? 
    urlForImage(props.media.mobilePhoto)
      .url()
      + '?v=1'
    : desktopImageUrl; // Fallback to desktop image if no mobile image

  return (
    <BaseCard {...props}>
      <div 
        className="cta-card bg-[#fff] h-full relative overflow-hidden" 
      >
        {/* Desktop Image */}
        <div 
          className="hidden md:block absolute inset-0" 
          style={{ 
            backgroundImage: `url(${desktopImageUrl})`, 
            backgroundSize: 'contain',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Mobile Image */}

        
        <div className="flex h-full flex-col md:block p-6 md:p-12 relative">
          <div className="mx-auto max-w-[600px] w-full flex flex-col flex-1 md:flex-none justify-center md:justify-start">
            <h2 className="text-lg text-[#222] mb-4 font-medium tracking-tight text-center break-words">
              {props.headline}
            </h2>
            <h2 className="text-base text-neutral-400 mb-8 md:mb-12 font-normal tracking-tight text-center">
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
          <div 
            className="w-full h-[50%] md:hidden mt-6" 
            style={{
              backgroundImage: `url(${mobileImageUrl})`, 
              backgroundSize: '80%',
              backgroundPosition: '50% 50%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default HeroCard;