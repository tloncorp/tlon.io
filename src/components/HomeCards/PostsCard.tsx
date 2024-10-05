import React from 'react';
import BaseCard from './BaseCard';
import type { HomeCard } from '../../utils/types';

interface PostsCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const PostsCard: React.FC<PostsCardProps> = (props) => {
  const recentPosts = [
    { 
      title: "Tlon's Plan", 
      author: "Galen Wolfe-Pauly", 
      slug: "https://tlon.io/post/roadmap", 
      imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/65f364a3f2e10544d7c58c6f7f81b3954caf59bc-1600x900.jpg?w=1500&fm=webp"   
    },
    { 
      title: "Tlon's Mission", 
      author: "Galen Wolfe-Pauly", 
      slug: "https://tlon.io/post/mission-statement", 
      imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/60bc2980246be1c6c4d48862a2ceddc1060c359c-1600x900.jpg?w=1500&fm=webp" 
    },
    { 
      title: "Tlon's Operating Principles", 
      author: "Galen Wolfe-Pauly", 
      slug: "https://tlon.io/post/operating-principles", 
      imageURL: "https://cdn.sanity.io/images/4vy6phvk/production/5114bdd8476f625a5501fa0d73db0fafb9378baa-1600x900.jpg?w=1500&fm=webp" 
    },
  ];

  return (
    <BaseCard {...props}>
      <div className="posts-card bg-[#f9f9f9] h-full flex items-center">
        <div className="p-6 md:p-12 w-full">
          <ul className="list-none p-0 flex flex-col gap-6 md:gap-8">
            {recentPosts.slice(0, 1).map((post, index) => (
              <li key={index} 
                  className="flex flex-col gap-4 items-center cursor-pointer font-medium tracking-tight hover:bg-[#f0f0f0] transition-colors duration-300 rounded-lg p-4 md:hidden"
                  onClick={() => window.open(post.slug, '_blank', 'noopener,noreferrer')}>
                <div className="w-full aspect-square relative overflow-hidden rounded-lg">
                  <img 
                    src={post.imageURL} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-xl text-[#222] mt-4 mb-1">{post.title}</span>
                  <p className="text-base text-[#999] mb-1">by {post.author}</p>
                </div>
              </li>
            ))}
            {recentPosts.map((post, index) => (
              <li key={index} 
                  className="hidden md:flex flex-row gap-6 items-center cursor-pointer font-medium tracking-tight hover:bg-[#f0f0f0] transition-colors duration-300 rounded-lg p-4"
                  onClick={() => window.open(post.slug, '_blank', 'noopener,noreferrer')}>
                <img 
                  src={post.imageURL} 
                  alt={post.title} 
                  className="w-24 h-24 rounded-lg object-cover object-center"
                />
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-xl text-[#222]">{post.title}</span>
                  <p className="text-base text-[#999]">by {post.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BaseCard>
  );
};

export default PostsCard;