import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useAnimation } from 'framer-motion';
import { urlForImage, urlForVideo } from '../utils/urlForImage';


interface HomeCardReactProps {
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
  isTopCard: boolean;
  index: number;
}

export default function HomeCardReact({ cardType, headline, body, bodyMinimized, media, button, isTopCard, index }: HomeCardReactProps) {
  console.log('HomeCardReact props:', { cardType, headline, body, bodyMinimized, media, button, isTopCard, index });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const ref = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isTopCard ? [1, 1, 0.75] : [0.45, 1, 0.75]
  );

  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0px 2px 4px rgba(0,0,0,0.25)",
      "0px 220px 80px rgba(0,0,0,0.1)",
      "0px 2px 4px rgba(0,0,0,0.25)"
    ]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({ opacity: 1, y: 0 });
    }, 300 * index);

    return () => clearTimeout(timeout);
  }, [controls, index]);

  const cardStyle = {
    scale: scale,
    boxShadow: shadow,
  };

  const baseCardClasses = "card w-full rounded-2xl overflow-hidden relative mb-[12vh]";
  const defaultCardClasses = `${baseCardClasses} aspect-[3/4] md:aspect-square`;
  const ctaCardClasses = `${baseCardClasses} aspect-[3/4] md:aspect-[6/2] p-6`; // Shorter on desktop

  const toggleFullscreen = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default click behavior
    event.stopPropagation(); // Prevent event from bubbling up
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
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
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  if (cardType === 'cta') {
    return (
      <motion.div 
        ref={ref} 
        className={`${ctaCardClasses} cta-card bg-[#f9f9f9]`}
        style={cardStyle}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    );
  }

  if (cardType === 'posts') {
    const recentPosts = [
      { title: "Tlon's Plan", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/roadmap", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/65f364a3f2e10544d7c58c6f7f81b3954caf59bc-1600x900.jpg?w=1500&fm=webp"   },
      { title: "Tlon's Mission", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/mission-statement", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/60bc2980246be1c6c4d48862a2ceddc1060c359c-1600x900.jpg?w=1500&fm=webp" },
      { title: "Tlon's Operating Principles", author: "Galen Wolfe-Pauly", slug: "https://tlon.io/post/operating-principles", imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/5114bdd8476f625a5501fa0d73db0fafb9378baa-1600x900.jpg?w=1500&fm=webp" },
    ];

    return (
      <motion.div 
        ref={ref} 
        className={`${defaultCardClasses} posts-card bg-[#f9f9f9] flex items-center`}
        style={{ 
          ...cardStyle,
          backgroundColor: '#f9f9f9',
        }} 
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className="p-12 w-full">
          <ul className="list-none p-0 flex flex-col gap-24">
            {recentPosts.map((post, index) => (
              <li key={index} className="flex flex-row gap-12 justify-between items-center cursor-pointer"
                  onClick={() => window.location.href = post.slug}>
                <div className="flex flex-col gap-1">
                  <span className="text-lg text-[#222]">{post.title}</span>
                  <p className="text-lg text-[#999]">by {post.author}</p>
                </div>
                <img 
                  src={post.imageURL} 
                  alt={post.title} 
                  className="w-24 h-24 rounded-2xl object-cover object-center"
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={ref} 
      className={defaultCardClasses}
      style={{ 
        ...cardStyle,
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }} 
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
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
            style={styles.video}
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
      <div className={`max-w-[400px] mx-auto ${
        cardType === 'feature' ? 'justify-start pt-[5.25rem] md:pt-[5.25rem]' : 'justify-center'
      }`} style={{
        ...styles.content,
        color: cardType === 'feature' ? '#222' : '#ffffff',
      }}>
        <h2 style={{
          ...styles.h2,
          color: cardType === 'feature' ? '#222' : '#ffffff',
        }}>{headline}</h2>
        <p style={{
          ...styles.p,
          color: cardType === 'feature' ? '#222' : '#ffffff',
        }}>{body}</p>
        {button && button.title && button.url && (
          <a
            className='rounded-full px-4 py-2'
            href={button.url} 
            target={button.openNewWindow ? '_blank' : '_self'} 
            rel={button.openNewWindow ? 'noopener noreferrer' : ''}
            style={{
              ...styles.button,
              backgroundColor: cardType === 'feature' ? '#222' : 'white',
              color: cardType === 'feature' ? 'white' : '#222',
            }}
          >
            {button.title}
          </a>
        )}
      </div>
    </motion.div>
  );
}

const styles = {
  video: {
    position: 'absolute',
    top: '150%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
    scale: '3',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    color: '#ffffff',
  },
  h2: {
    fontSize: '1rem',
    marginBottom: '0',
    textAlign: 'center',
  },
  p: {
    fontSize: '1rem',
    textAlign: 'center',
  },
  button: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#222',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'normal',
    marginTop: '1rem',
  },
} as const;