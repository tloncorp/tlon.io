import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import type { HomeCard } from '../../utils/types';
import { urlForImage } from '../../utils/urlForImage';

interface FeatureCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const desktopImageUrl = props.media?.photo?.asset ? 
    urlForImage(props.media.photo)
      .url()
      + '?v=1'
    : '';

  const mobileImageUrl = props.media?.mobilePhoto?.asset ? 
    urlForImage(props.media.mobilePhoto)
      .url()
      + '?v=1'
    : desktopImageUrl;

  return (
    <BaseCard {...props}>
      <div 
        className="feature-card bg-[#fff] h-full relative overflow-hidden"
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
        <div className="flex h-full flex-col md:block p-6 md:p-12 relative">
          <div className="h-[30%] md:h-[22%] flex items-center">
            <ContentWrapper {...props} />
          </div>
          {/* Mobile Image */}
          <div 
            className="w-full h-[780%] md:hidden"
            style={{
              backgroundImage: `url(${mobileImageUrl})`, 
              backgroundSize: '100%',
              backgroundPosition: '50% 50%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default FeatureCard;