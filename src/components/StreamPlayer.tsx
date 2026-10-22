import React, { useState } from 'react';
import { Youtube, Facebook, Play, ExternalLink, X } from 'lucide-react';

interface StreamPlayerProps {
  platform: 'youtube' | 'twitch' | 'kick' | 'facebook';
  url: string;
  title?: string;
  isActive?: boolean;
}

export function StreamPlayer({ platform, url, title, isActive = false }: StreamPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  const getEmbedUrl = (platform: string, url: string) => {
    if (platform === 'youtube') {
      // Extract video ID from YouTube URL
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    }
    return url;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-500" />;
      case 'twitch':
        return <Play className="h-5 w-5 text-purple-500" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-500" />;
      case 'kick':
        return <Play className="h-5 w-5 text-green-500" />;
      default:
        return <Play className="h-5 w-5" />;
    }
  };

  const embedUrl = getEmbedUrl(platform, url);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#080d1a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-900 p-2">
            {getPlatformIcon(platform)}
          </div>
          <div>
            <div className="text-sm font-semibold text-white capitalize">{platform}</div>
            {title && <div className="text-xs text-slate-400">{title}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && (
            <div className="flex items-center gap-1 rounded-full bg-red-500/20 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-300">LIVE</span>
            </div>
          )}
          <button
            onClick={() => setShowPlayer(!showPlayer)}
            className="rounded-lg p-2 text-slate-400 hover:text-white transition"
          >
            {showPlayer ? <X className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 text-slate-400 hover:text-white transition"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Video Player */}
      {showPlayer && (
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'}`}>
          <div className="relative w-full h-full">
            <iframe
              src={embedUrl}
              title={title || `${platform} stream`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Placeholder when player is closed */}
      {!showPlayer && (
        <div className="aspect-video flex items-center justify-center bg-slate-900/50">
          <div className="text-center">
            <Play className="mx-auto h-12 w-12 text-slate-500 mb-3" />
            <p className="text-sm text-slate-400">Click to play stream</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white"
            >
              Open on {platform} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
