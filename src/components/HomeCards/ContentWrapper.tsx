import React, { useRef, useState, useEffect } from 'react';
import type { HomeCard } from '../../utils/types';
import { urlForImage, urlForVideo } from '../../utils/urlForImage';

const ContentWrapper: React.FC<HomeCard> = ({ cardType, headline, body, button, media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatHeadline = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 3) return text;
    return (
      <>
        {words.slice(0, 3).join(' ')}
        <br className="md:hidden" />
        {' ' + words.slice(3).join(' ')}
      </>
    );
  };

  const togglePlayAndFullscreen = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!videoRef.current) return;

    if (!isPlaying) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Reset video to the beginning
      videoRef.current.play();
      setIsPlaying(true);
      videoRef.current.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const preventVideoToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play();
        setIsPlaying(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className={`max-w-[400px] mx-auto ${
      cardType === 'feature' 
        ? 'h-full flex flex-col justify-start pt-[4.25rem] md:pt-[4.25rem]' 
        : 'flex flex-col justify-center h-full'
    }`}>
      <h2 className={`text-center text-lg mb-2 font-medium tracking-tight leading-[1.2] ${
        cardType === 'feature' ? 'text-[#222]' : 'text-white'
      } ${cardType === 'story' ? 'text-2xl' : ''}`}>
        {(cardType === 'hero' || cardType === 'story') ? formatHeadline(headline) : headline}
      </h2>
      <p className={`text-center max-w-[260px] md:max-w-[340px] mx-auto mt-2 mb-2 ${
        cardType === 'feature' ? 'text-[#999]' : 'text-white'
      } ${cardType === 'story' ? 'text-lg' : ''}`}>
        {body}
      </p>
      {button && button.title && button.url && (
        <div className="text-center mt-4">
          <a
            className={`rounded-full px-4 py-2 inline-block ${
              cardType === 'feature' ? 'bg-[#222] text-white' : 'bg-white text-[#222]'
            }`}
            href={button.url}
            target={button.openNewWindow ? '_blank' : '_self'}
            rel={button.openNewWindow ? 'noopener noreferrer' : ''}
          >
            {button.title}
          </a>
        </div>
      )}
      {cardType === 'feature' && media && media.type === 'photo' && (
        <div className="mt-8 relative">
          <img 
            src={media.photo ? urlForImage(media.photo).url() : ''} 
            alt="Feature illustration" 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] max-w-[300px]"
          />
        </div>
      )}
      {media && media.type === 'video' && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlayAndFullscreen}
        >
          <video 
            ref={videoRef}
            src={urlForVideo(media.video)} 
            loop 
            muted
            autoPlay
            playsInline 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[250%] z-[-1]"
            onClick={preventVideoToggle}
          />
          <div className="absolute bottom-4 left-4">
            <button 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-60 hover:scale-110 transition-all duration-300"
              onClick={togglePlayAndFullscreen}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
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
    </div>
  );
};

export default ContentWrapper;