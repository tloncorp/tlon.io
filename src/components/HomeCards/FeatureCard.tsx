import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import type { HomeCard } from '../../utils/types';

interface FeatureCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  return (
    <BaseCard {...props}>
      <div className="feature-card bg-[#f9f9f9] h-full">
        <ContentWrapper {...props} />
      </div>
    </BaseCard>
  );
};

export default FeatureCard;