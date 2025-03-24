import React, { useRef, useState, useEffect } from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import type SwiperType from 'swiper';
import { createPortal } from 'react-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface VideoGalleryCardProps extends HomeCard {
  // Any additional props needed
}

// YouTube Lightbox component using portal for full viewport positioning
const YouTubeLightbox = ({ videoUrl, onClose }: { videoUrl: string, onClose: () => void }) => {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  // Handle click outside to close
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Use portal to render outside the card's DOM hierarchy
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      {/* Close button positioned in the absolute top right corner of the window */}
      <button 
        className="fixed top-4 right-4 text-white hover:text-gray-300 p-2 z-[60]"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div 
        ref={containerRef} 
        className="relative w-full md:w-[80%] lg:w-[75%] xl:w-[70%] max-w-[1200px] mx-auto"
      >
        {/* 16:9 aspect ratio container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
};

const VideoGalleryCard: React.FC<VideoGalleryCardProps> = (props) => {
  const { headline, body, title, subtitle, videos } = props;
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  
  // Debug the props to see what data we're getting
  //console.log('VideoGalleryCard props:', { headline, body, title, subtitle, videos });

  // Determine which text to use for heading and description
  const displayHeadline = headline || title || '';
  const displayBody = body || subtitle || '';

  // Custom styles for Swiper elements
  const swiperStyles = {
    // Container styles
    container: {
      margin: '0 -24px', // Negative margin to create full bleed effect
      width: 'calc(100% + 48px)', // Compensate for the negative margins
    },
    // Custom arrow styles
    prevButton: {
      position: 'absolute',
      top: '50%',
      left: '0px',
      transform: 'translateY(-50%)',
      zIndex: 10,
      color: 'transparent',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
    },
    nextButton: {
      position: 'absolute',
      top: '50%',
      right: '0px',
      transform: 'translateY(-50%)',
      zIndex: 10,
      color: 'transparent',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
    },
    // Pagination container
    paginationContainer: {
      position: 'absolute',
      bottom: '-30px', // Position below the slides
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 10,
    }
  };

  // Add custom styles to document head
  React.useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide default Swiper arrows */
      .swiper-button-next::after,
      .swiper-button-prev::after {
        display: none;
      }
      
      /* Custom pagination */
      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: #d1d5db;
        opacity: 1;
        margin: 0 4px;
      }
      
      .swiper-pagination-bullet-active {
        background: #374151;
        width: 10px;
        height: 10px;
      }
      
      /* Move pagination to bottom */
      .swiper-pagination {
        position: absolute;
        bottom: -30px !important;
        left: 0;
        right: 0;
      }
      
      /* Full bleed swiper container */
      .full-bleed-swiper {
        overflow: visible !important;
        padding-bottom: 40px !important; /* Space for pagination */
      }
      
      .full-bleed-swiper .swiper-wrapper {
        overflow: visible !important;
      }
      
      /* Video thumbnail hover effects */
      .video-thumbnail {
        overflow: hidden;
        position: relative;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 0.75rem;
        aspect-ratio: 16/9;
      }
      
      .video-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .video-thumbnail:hover img {
        transform: scale(1.05);
      }
      
      .video-play-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.5s ease;
      }
      
      .video-thumbnail:hover .video-play-overlay {
        background-color: rgba(0, 0, 0, 0.4);
      }
      
      .video-play-icon {
        width: 4rem;
        height: 4rem;
        color: white;
        opacity: 0.7;
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      
      .video-thumbnail:hover .video-play-icon {
        opacity: 1;
        transform: scale(1.1);
      }
      
      /* Slide styles */
      .swiper-slide {
        transition: opacity 0.3s ease;
      }
      
      .swiper-slide:not(.swiper-slide-active) {
        cursor: pointer;
      }
      
      /* Responsive adjustments */
      @media (min-width: 768px) {
        .video-gallery-prev-button {
          left: 20px;
        }
        
        .video-gallery-next-button {
          right: 20px;
        }
      }
    `;
    
    // Add ID to identify this style element
    style.id = 'video-gallery-styles';
    
    // Add style to head if it doesn't exist yet
    if (!document.getElementById('video-gallery-styles')) {
      document.head.appendChild(style);
    }
    
    // Cleanup on unmount
    return () => {
      const styleElement = document.getElementById('video-gallery-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <BaseCard {...props}>
      <div className="bg-white h-full flex flex-col justify-center py-10 px-6 overflow-hidden">
        {/* Display headline with styling matching other cards */}
        {displayHeadline && (
          <h2 className="mb-2 text-center text-lg font-medium leading-[1.2] tracking-tight text-[#222]">
            {displayHeadline}
          </h2>
        )}
        
        {/* Display body with styling matching other cards */}
        {displayBody && (
          <p className="mx-auto mb-2 mt-2 max-w-[260px] text-center text-[#999] md:max-w-[340px]">
            {displayBody}
          </p>
        )}
        
        {videos && videos.length > 0 ? (
          <div className="relative w-full pb-10 mt-8"> {/* Added margin top to match other cards */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ 
                clickable: true,
                el: '.video-gallery-pagination', // Custom pagination container
              }}
              navigation={{
                nextEl: '.video-gallery-next-button',
                prevEl: '.video-gallery-prev-button',
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              style={swiperStyles.container}
              className="full-bleed-swiper"
            >
              {videos.map((videoItem, index) => (
                <SwiperSlide key={index} className="w-[85%] max-w-2xl">
                  {({ isActive }) => (
                    <div className="block">
                      {/* If active slide, use a div with onClick to open lightbox */}
                      {isActive ? (
                        <div 
                          className="block cursor-pointer"
                          onClick={() => setLightboxUrl(videoItem.video.url)}
                        >
                          {videoItem.video.thumbnail && (
                            <div className="video-thumbnail">
                              <img
                                src={videoItem.video.thumbnail}
                                alt={videoItem.video.title || 'Video thumbnail'}
                              />
                              <div className="video-play-overlay">
                                <svg 
                                  className="video-play-icon" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <h3 className="font-medium text-[#222]">{videoItem.title}</h3>
                            {videoItem.duration && (
                              <span className="text-sm text-neutral-500 block mt-1">{videoItem.duration}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* If not active slide, use a div with onClick to center the slide */
                        <div 
                          className="block cursor-pointer"
                          onClick={() => {
                            if (swiperRef.current) {
                              swiperRef.current.slideTo(index);
                            }
                          }}
                        >
                          {videoItem.video.thumbnail && (
                            <div className="video-thumbnail">
                              <img
                                src={videoItem.video.thumbnail}
                                alt={videoItem.video.title || 'Video thumbnail'}
                              />
                              <div className="video-play-overlay">
                                <svg 
                                  className="video-play-icon" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <h3 className="font-medium text-[#222]">{videoItem.title}</h3>
                            {videoItem.duration && (
                              <span className="text-sm text-neutral-500 block mt-1">{videoItem.duration}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom pagination container */}
            <div className="video-gallery-pagination" style={swiperStyles.paginationContainer}></div>
            
            {/* Custom navigation buttons */}
            <button 
              className="video-gallery-prev-button" 
              style={swiperStyles.prevButton}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="video-gallery-next-button" 
              style={swiperStyles.nextButton}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-center text-neutral-500">No videos available</p>
        )}
        
        {/* YouTube Lightbox */}
        {lightboxUrl && (
          <YouTubeLightbox 
            videoUrl={lightboxUrl} 
            onClose={() => setLightboxUrl(null)} 
          />
        )}
      </div>
    </BaseCard>
  );
};

export default VideoGalleryCard; 