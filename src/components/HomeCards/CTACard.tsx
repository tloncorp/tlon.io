import React from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

interface CTACardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const CTACard: React.FC<CTACardProps> = (props) => {
  return (
    <BaseCard {...props}>
      <div className="cta-card bg-[#f9f9f9] h-full">
        <div className="flex flex-col h-full justify-center items-center gap-8 p-8">
          <span className="text-[#999]">Announcing TM</span>
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="text-xl text-[#222] mb-12 font-medium tracking-tight">Now available for download</h2>
            <div className="flex flex-row gap-4 w-full justify-center">
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center"
                href="https://apps.apple.com/your-app-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-6 flex justify-center">
                  <FaApple className="text-2xl" />
                </div>
                <div className="flex-1 text-left ml-4 flex flex-col">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </a>
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center"
                href="https://play.google.com/store/your-play-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-6 flex justify-center">
                  <FaGooglePlay className="text-2xl" />
                </div>
                <div className="flex-1 text-left ml-4 flex flex-col">
                  <span className="text-xs">Get it on</span>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default CTACard;