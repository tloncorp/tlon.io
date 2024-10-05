import React from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';
import ContentWrapper from './ContentWrapper';
import { urlForImage } from '../../utils/urlForImage';

interface FooterCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const FooterCard: React.FC<FooterCardProps> = (props) => {
  const { media } = props;

  const getBackgroundImageUrl = () => {
    if (media && media.type === 'photo' && media.photo) {
      return urlForImage(media.photo).url();
    }
    return '';
  };

  const backgroundImageUrl = getBackgroundImageUrl();

  return (
    <BaseCard {...props}>
      <div 
        className="footer-card flex items-center h-full"
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

export default FooterCard;