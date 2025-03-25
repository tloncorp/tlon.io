import React from "react";
import BaseCard from "./BaseCard";
import ContentWrapper from "./ContentWrapper";
import { urlForImage } from "../../utils/urlForImage";
import type { HomeCard } from "../../utils/types";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import NewsletterSignup from "../NewsletterSignup";

interface HeroCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const HeroCard: React.FC<HeroCardProps> = props => {
  const desktopImageUrl = props.media?.photo?.asset
    ? urlForImage(props.media.photo).url() + "?v=1"
    : "";

  const mobileImageUrl = props.media && 'mobilePhoto' in props.media && props.media.mobilePhoto?.asset
    ? urlForImage(props.media.mobilePhoto).url() + "?v=1"
    : desktopImageUrl; // Fallback to desktop image if no mobile image

  return (
    <BaseCard {...props}>
      <div className="cta-card relative h-full overflow-hidden bg-[#fff]">
        {/* Desktop Image */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative flex h-full flex-col p-6 md:block md:p-12">
          <div className="mx-auto flex w-full max-w-[600px] flex-1 flex-col justify-center md:flex-none md:justify-start">
            <h2 className="mb-4 break-words text-center text-lg font-medium tracking-tight text-[#222]">
              {props.headline}
            </h2>
            <h2 className="mb-4 text-center text-base font-normal tracking-tight text-neutral-400 md:mb-8">
              {props.body}
            </h2>
            <NewsletterSignup />
            <div className="mt-8 flex flex-row justify-center gap-2 md:gap-4">
              <p className="text-center text-sm font-normal tracking-tight text-neutral-400">
                Have an invite or account? Download for{" "}
                <a
                  className="underline"
                  href="https://apps.apple.com/us/app/tlon-tlon-messenger/id6451392109"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iOS
                </a>{" "}
                or{" "}
                <a
                  className="underline"
                  href="https://play.google.com/store/apps/details?id=io.tlon.groups"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android
                </a>
              </p>
            </div>
          </div>
          {/* Mobile Image */}
          <div
            className="mt-6 h-[50%] w-full md:hidden"
            style={{
              backgroundImage: `url(${mobileImageUrl})`,
              backgroundSize: "80%",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default HeroCard;
