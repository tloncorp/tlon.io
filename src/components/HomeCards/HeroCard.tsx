import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import { urlForImage } from '../../utils/urlForImage';
import type { HomeCard } from '../../utils/types';

interface HeroCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const backgroundImageUrl = props.media && props.media.type === 'photo' ? urlForImage(props.media.photo) : '';

  return (
    <BaseCard {...props}>
      <div 
        className="hero-card flex items-center h-full"
        style={{ 
          backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <ContentWrapper {...props} />
      </div>
    </BaseCard>
  );
};

export default HeroCard;