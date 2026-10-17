"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt auto-play on first user click anywhere on document
    const handleFirstUserInteraction = () => {
      if (!hasInteracted && audioRef.current && weddingConfig.music.enabled) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Browser prevented autoplay, stay paused
          });
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback error:", err));
    }
  };

  if (!weddingConfig.music.enabled) return null;

  return (
    <div className="fixed right-4 top-20 z-40 sm:right-6 sm:top-24">
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />

      <div className="group relative flex items-center">
        {/* Tooltip Info */}
        <div className="pointer-events-none absolute right-14 hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-gold-300/30 bg-emerald-950/90 px-3 py-1.5 text-xs text-white shadow-lg transition-all group-hover:flex">
          <Music size={12} className="text-gold-400" />
          <span>
            {isPlaying ? "Sedang Dimainkan: " : "Mainkan Lagu: "}
            <strong className="text-gold-300">{weddingConfig.music.artist}</strong>
          </span>
        </div>

        {/* Circular Floating Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda Muzik" : "Mainkan Muzik"}
          className={`relative flex items-center justify-center rounded-full p-3 shadow-gold transition-all duration-300 focus:outline-none ${
            isPlaying
              ? "scale-105 animate-pulse-subtle bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold-glow"
              : "border border-gold-300 bg-white/90 text-stone-700 backdrop-blur-md hover:border-gold-500 hover:text-gold-600"
          }`}
        >
          {/* Animated decorative ring when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 animate-ping rounded-full border border-gold-400/50 opacity-75" />
          )}

          {isPlaying ? (
            <div className="flex items-center justify-center">
              <Volume2 size={20} className="animate-spin-slow" />
            </div>
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
