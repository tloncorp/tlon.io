import React from 'react';
import BaseCard from './BaseCard';
import VideoGallery from '../VideoGallery/VideoGallery';
import type { HomeCard } from '../../utils/types';

interface VideoGalleryCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const VideoGalleryCard: React.FC<VideoGalleryCardProps> = (props) => {
  return (
    <BaseCard {...props}>
      <div className="video-gallery-card h-full bg-white">
        <VideoGallery
          title={props.title || ''}
          subtitle={props.subtitle || ''}
          headline={props.headline || ''}
          body={props.body || ''}
          videos={props.videos || []}
        />
      </div>
    </BaseCard>
  );
};

export default VideoGalleryCard; 