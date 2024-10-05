import React, { useRef, useState } from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';
import ContentWrapper from './ContentWrapper';
import { urlForImage, urlForVideo } from '../../utils/urlForImage';

interface StoryCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = (props) => {
  const { media } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const backgroundImageUrl = media && media.type === 'photo' ? urlForImage(media.photo).url() : '';
  const videoUrl = media && media.type === 'video' ? urlForVideo(media.video) : '';

  const toggleFullscreen = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const preventVideoToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <BaseCard {...props}>
      <div 
        className="story-card flex items-center h-full"
        style={{ 
          backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {media && media.type === 'video' && (
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={toggleFullscreen}
          >
            <video 
              ref={videoRef}
              src={videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute top-[150%] left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-[-1] scale-[3]"
              onClick={preventVideoToggle}
            ></video>
            <div className="absolute bottom-4 left-4">
              <button 
                className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-60 hover:scale-110 transition-all duration-300"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
        <ContentWrapper {...props} />
      </div>
    </BaseCard>
  );
};

export default StoryCard;