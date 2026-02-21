import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import images from "@/constant/images";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import titleUnderline from "./Vector 13.svg";
import { fetchVideos, getYouTubeThumbnails, VideoData } from "@/Api/googleSheetsClient";

interface VideoItem {
  url: string;
  thumbnail: string;
  thumbnailFallbacks: string[];
  titleEn: string;
  titleNl: string;
  descriptionEn: string;
  descriptionNl: string;
}

const fallbackVideoData: VideoItem[] = [
  {
    url: "https://youtu.be/mp56T2AXHnc",
    thumbnail: images.landingPage.EC_businessclassThumbnail,
    thumbnailFallbacks: [],
    titleEn: "Interview with Teagan De Groot – Business Class",
    titleNl: "Interview met Teagan De Groot – Business Class",
    descriptionEn: "Teagan De Groot discusses Edge Capital's EdgeFund approach to market volatility, risk management, and market-neutral strategy design in an interview with Business Class.",
    descriptionNl: "Teagan De Groot bespreekt Edge Capital's EdgeFund-aanpak van marktvolatiliteit, risicobeheer en marktneutrale strategieontwerp in een interview met Business Class.",
  },
  {
    url: "https://youtu.be/9QzTeE02-Ps",
    thumbnail: images.landingPage.EC_businessclassThumbnail,
    thumbnailFallbacks: [],
    titleEn: "Edge Capital Media Feature",
    titleNl: "Edge Capital Mediafunctie",
    descriptionEn: "Discover how Edge Capital is making headlines with innovative investment strategies.",
    descriptionNl: "Ontdek hoe Edge Capital de krantenkoppen haalt met innovatieve beleggingsstrategieën.",
  },
  {
    url: "https://youtu.be/fjxBUhkP9FM",
    thumbnail: images.landingPage.EC_businessclassThumbnail,
    thumbnailFallbacks: [],
    titleEn: "Edge Capital Strategy Insights",
    titleNl: "Edge Capital Strategie Inzichten",
    descriptionEn: "An in-depth look at our investment approach and market analysis.",
    descriptionNl: "Een diepgaande blik op onze investeringsaanpak en marktanalyse.",
  },
  {
    url: "https://youtu.be/8IdC8PDB4Cc",
    thumbnail: images.landingPage.Vid4Thumbnail,
    thumbnailFallbacks: [],
    titleEn: "Edge Capital Innovation",
    titleNl: "Edge Capital Innovatie",
    descriptionEn: "How technology and expertise come together at Edge Capital.",
    descriptionNl: "Hoe technologie en expertise samenkomen bij Edge Capital.",
  },
];

const mapApiToVideoItems = (apiVideos: VideoData[]): VideoItem[] => {
  return apiVideos
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => {
      const thumbs = getYouTubeThumbnails(v.youtube_url);
      return {
        url: v.youtube_url,
        thumbnail: v.thumbnail_url || thumbs[0] || '',
        thumbnailFallbacks: v.thumbnail_url ? thumbs : thumbs.slice(1),
        titleEn: v.title_en,
        titleNl: v.title_nl,
        descriptionEn: v.description_en,
        descriptionNl: v.description_nl,
      };
    });
};

const HomepageVideo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoData, setVideoData] = useState<VideoItem[]>(fallbackVideoData);
  const { language } = useChangeLanguageContext();

  useEffect(() => {
    const loadVideos = async () => {
      const data = await fetchVideos();
      if (data && data.length > 0) {
        setVideoData(mapApiToVideoItems(data));
      }
    };
    loadVideos();
  }, []);

  const handleSwitch = (dir: "next" | "prev") => {
    const nextIndex =
      dir === "next"
        ? (activeIndex + 1) % videoData.length
        : (activeIndex - 1 + videoData.length) % videoData.length;

    setActiveIndex(nextIndex);
    setIsPlaying(false);
  };

  const translations = {
    en: {
      title: "Edge Capital in the media",
      subtitle:
        "Get in touch with us and sign up for our newsletter for questions, support or feedback. We are ready to help you every step of the way.",
      next: "Next",
      previous: "Previous",
    },
    nl: {
      title: "Edge Capital in de media",
      subtitle:
        "Ontdek hoe Edge Capital in het nieuws komt — bekijk mediaberichtgeving en evenementen die onze innovatie, strategie en mensen belichten.",
      next: "Volgende",
      previous: "Vorige",
    },
  };

  const t = translations[language] || translations.en;
  const currentVideo = videoData[activeIndex];
  const currentUrl = currentVideo.url;
  const canPlayCurrent = ReactPlayer.canPlay(currentUrl);

  return (
    <section className="w-[98%] max-w-[1700px] mx-auto px-0 md:px-4 py-16">
      {/* Header - Centered */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-[#02080A] mb-1">
          {t.title}
        </h2>
        <img src={titleUnderline} alt="" className="mx-auto w-[clamp(200px,30vw,350px)] h-auto mb-3" />
        <p className="text-[#02080A] opacity-80 max-w-2xl mx-auto text-base md:text-lg">
          {t.subtitle}
        </p>
      </div>

      {/* Video Container with dark border - includes title/description */}
      <div className="bg-[#02080A] rounded-[15px] p-1.5 md:p-4">
        {/* Video holder with 30px radius */}
        <div className="relative rounded-[15px] overflow-hidden pt-[56.25%] h-0">
          {isPlaying && canPlayCurrent ? (
            <ReactPlayer
              url={currentUrl}
              playing
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0 rounded-[30px]"
            />
          ) : (
            <>
              <img
                src={currentVideo.thumbnail}
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover rounded-[30px] blur-sm"
                onError={(e) => {
                  const fallbacks = currentVideo.thumbnailFallbacks;
                  const img = e.currentTarget;
                  const currentSrc = img.src;
                  const idx = fallbacks.findIndex((f) => currentSrc.includes(f) || f.includes(currentSrc));
                  const nextIdx = idx >= 0 ? idx + 1 : 0;
                  if (nextIdx < fallbacks.length) {
                    img.src = fallbacks[nextIdx];
                  }
                }}
              />
              <button
                onClick={() => {
                  if (canPlayCurrent) {
                    setIsPlaying(true);
                  } else {
                    window.open(currentUrl, "_blank");
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-black/50 backdrop-blur-md p-5 rounded-full shadow-xl transition hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          )}
        </div>

        {/* Video Title & Description - inside dark container */}
        <div className="mt-8 px-2 pb-4">
          <h3 className="text-[24px] md:text-[32px] font-semibold text-white mb-2">
            {language === 'nl' ? currentVideo.titleNl : currentVideo.titleEn}
          </h3>
          <p className="text-[14px] md:text-[16px] text-white/70 max-w-4xl">
            {language === 'nl' ? currentVideo.descriptionNl : currentVideo.descriptionEn}
          </p>
        </div>
      </div>

      {/* Navigation Controls - Centered */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => handleSwitch("prev")}
          className="bg-[#005569] text-white px-6 py-3 rounded-full hover:bg-[#006d7a] transition flex items-center gap-2 text-sm md:text-base font-medium"
        >
          <ArrowLeft size={16} /> {t.previous}
        </button>
        <button
          onClick={() => handleSwitch("next")}
          className="bg-[#005569] text-white px-6 py-3 rounded-full hover:bg-[#006d7a] transition flex items-center gap-2 text-sm md:text-base font-medium"
        >
          {t.next} <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default HomepageVideo;
