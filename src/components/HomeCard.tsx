import React from 'react';
import { Image } from 'astro:assets';
import { urlForImage, urlForVideo } from '../utils/urlForImage';

interface Props {
  cardType: string;
  headline: string;
  body: string;
  bodyMinimized?: string;
  media?: {
    type?: 'photo' | 'video';
    photo?: any;
    video?: any;
  };
  button?: {
    title?: string;
    url?: string;
    openNewWindow?: boolean;
  };
  isTopCard?: boolean;
  index?: number;
}

const HomeCard: React.FC<Props> = ({ 
  cardType, 
  headline, 
  body, 
  bodyMinimized, 
  media, 
  button, 
  isTopCard = false, 
  index = 0 
}) => {
  const getImageUrl = (image: any) => {
    if (image && image.asset && image.asset._ref) {
      return urlForImage(image).url();
    }
    return '';
  };

  const getVideoUrl = (video: any) => {
    if (video && video.asset && video.asset._ref) {
      return urlForVideo(video);
    }
    return '';
  };

  const backgroundImageUrl = media && media.type === 'photo' ? getImageUrl(media.photo) : '';
  const videoUrl = media && media.type === 'video' ? getVideoUrl(media.video) : '';

  const baseCardClasses = "card w-full rounded-2xl overflow-hidden relative mb-[12vh]";
  const defaultCardClasses = `${baseCardClasses} aspect-[3/4] md:aspect-square`;
  const ctaCardClasses = `${baseCardClasses} aspect-[3/4] md:aspect-[6/2] p-6`;

  React.useEffect(() => {
    const card = document.getElementById(`card-${index}`);
    const video = card?.querySelector('video');
    const fullscreenToggle = document.getElementById(`fullscreen-toggle-${index}`);

    if (video && fullscreenToggle) {
      fullscreenToggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!document.fullscreenElement) {
          video.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });
    }
  }, [index]);

  return (
    <div id={`card-${index}`} className={`${cardType === 'cta' ? ctaCardClasses : defaultCardClasses} ${cardType === 'cta' ? 'cta-card bg-[#f9f9f9]' : ''}`}>
      {cardType === 'cta' ? (
        <div className="flex flex-col h-full gap-8 md:gap-4 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#555] to-[#000000] flex justify-center items-center transform rotate-5 shadow-lg order-1 md:order-2 mb-6 md:mb-0">
              <span className="text-white text-4xl md:text-5xl font-bold">TM</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-2/3 order-2 md:order-1">
              <h2 className="text-2xl md:text-xl text-[#222] mb-6">TM is now available for download</h2>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <a
                  className="rounded-lg px-6 py-3 bg-[#222] text-white text-center w-full md:w-auto"
                  href="https://apps.apple.com/your-app-store-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store
                </a>
                <a
                  className="rounded-lg px-6 py-3 bg-[#222] text-white text-center w-full md:w-auto"
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
      ) : cardType === 'posts' ? (
        <div className="p-12 w-full">
          <ul className="list-none p-0 flex flex-col gap-24">
            {[
              { title: "Tlon's Plan", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/roadmap", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/65f364a3f2e10544d7c58c6f7f81b3954caf59bc-1600x900.jpg?w=1500&fm=webp"   },
              { title: "Tlon's Mission", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/mission-statement", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/60bc2980246be1c6c4d48862a2ceddc1060c359c-1600x900.jpg?w=1500&fm=webp" },
              { title: "Tlon's Operating Principles", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/operating-principles", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/5114bdd8476f625a5501fa0d73db0fafb9378baa-1600x900.jpg?w=1500&fm=webp" },
            ].map((post, index) => (
              <li key={index} className="flex flex-row gap-12 justify-between items-center cursor-pointer">
                <a href={post.slug} className="flex flex-row gap-12 justify-between items-center w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#222]">{post.title}</span>
                    <p className="text-lg text-[#999]">by {post.author}</p>
                  </div>
                  <Image 
                    src={post.imageURL} 
                    alt={post.title} 
                    width={96}
                    height={96}
                    class="rounded-2xl object-cover object-center"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {media && media.type === 'video' && (
            <div className="absolute inset-0">
              <video 
                src={videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute top-[150%] left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-[-1] scale-[3]"
              ></video>
              <div className="absolute bottom-4 left-4">
                <button 
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-60 hover:scale-110 transition-all duration-300"
                  id={`fullscreen-toggle-${index}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className={`max-w-[400px] mx-auto ${
            cardType === 'feature' ? 'justify-start pt-[5.25rem] md:pt-[5.25rem]' : 'justify-center'
          } absolute inset-0 flex flex-col items-center p-8`} style={{
            color: cardType === 'feature' ? '#222' : '#ffffff',
          }}>
            <h2 className="text-center mb-0" style={{
              color: cardType === 'feature' ? '#222' : '#ffffff',
            }}>{headline}</h2>
            <p className="text-center" style={{
              color: cardType === 'feature' ? '#222' : '#ffffff',
            }}>{body}</p>
            {button && button.title && button.url && (
              <a
                className='rounded-full px-4 py-2 mt-4 inline-block'
                href={button.url} 
                target={button.openNewWindow ? '_blank' : '_self'} 
                rel={button.openNewWindow ? 'noopener noreferrer' : ''}
                style={{
                  backgroundColor: cardType === 'feature' ? '#222' : 'white',
                  color: cardType === 'feature' ? 'white' : '#222',
                }}
              >
                {button.title}
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCard;