"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface YouTubeModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

interface YouTubePreviewProps {
  url: string;
  alt: string;
  onClick: () => void;
  className?: string;
}

// Extract YouTube video ID from various URL formats
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(
  url: string,
  quality: "default" | "medium" | "high" | "maxres" = "high"
): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    maxres: "maxresdefault",
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// YouTube Preview thumbnail with play button
export function YouTubePreview({
  url,
  alt,
  onClick,
  className = "",
}: YouTubePreviewProps) {
  const videoId = getYouTubeVideoId(url);
  const thumbnail = getYouTubeThumbnail(url);

  if (!videoId || !thumbnail) return null;

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
    >
      <Image
        src={thumbnail}
        alt={alt}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute top-2 left-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg border border-accent-primary/50 group-hover:scale-110 transition-transform">
          <svg
            className="w-3 h-3 text-white ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default function YouTubeModal({ videoUrl, onClose }: YouTubeModalProps) {
  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (videoUrl) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [videoUrl, handleEscape]);

  if (!videoUrl || !videoId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10 flex items-center gap-2"
        >
          <span className="text-sm">Close</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* YouTube Embed */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Exercise Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
