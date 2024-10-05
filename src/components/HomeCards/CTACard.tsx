import React from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';

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
            <div className="flex flex-col gap-4 w-full max-w-[240px]">
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] text-center w-full font-semibold hover:bg-[#d6d7d4] transition-colors duration-300"
                href="https://apps.apple.com/your-app-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store
              </a>
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] text-center w-full font-semibold hover:bg-[#d6d7d4] transition-colors duration-300"
                href="https://play.google.com/store/your-play-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default CTACard;