import React from 'react';
import { urlForImage } from '../../utils/urlForImage';

interface VideoGalleryProps {
  headline: string;
  body: string;
  videos: {
    title: string;
    duration: string;
    video: {
      thumbnail: any; // Sanity image asset
      title: string;
      url: string;
    };
  }[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ headline, body, videos }) => {
  return (
    <div className="mx-auto max-w-[600px] w-full flex flex-col flex-1 md:flex-none">
      <h2 className="text-lg text-[#222] mb-4 mt-4 font-medium tracking-tight text-center break-words max-w-[300px] mx-auto">
        {headline}
      </h2>
      <p className="text-base text-neutral-400 mb-8 md:mb-12 font-normal tracking-tight text-center max-w-[300px] mx-auto">
        {body}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos?.map((video, index) => (
          <a
            key={index}
            href={video.video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-lg"
          >
            {video.video.thumbnail && (
              <div className="aspect-video relative">
                <img
                  src={urlForImage(video.video.thumbnail).url()}
                  alt={video.video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-[#222] font-medium mb-1">{video.title}</h3>
              {video.duration && (
                <span className="text-sm text-neutral-400">{video.duration}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery; 