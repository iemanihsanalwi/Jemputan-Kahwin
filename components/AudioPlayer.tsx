"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Music, VolumeX, Disc, Volume2 } from "lucide-react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";

/**
 * AudioPlayer - High-efficiency background audio player.
 * 
 * Performance & UX:
 * - Lazy-loaded: Does NOT mount audio source or preload until the user clicks "Buka Jemputan".
 * - Tab visibility aware: Stops visual animations when document.visibilityState is 'hidden'.
 * - Clean, non-distracting UI matching the Islamic botanical palette.
 */
export default function AudioPlayer() {
  const weddingConfig = useWeddingConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const audioConfig = weddingConfig.audio || weddingConfig.music;
  const audioSource =
    audioConfig?.src || audioConfig?.source || "/audio/wedding-bgm.mp3";

  // Watch tab visibility to avoid rendering animations while backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Soft Fade Audio Transition
  const fadeAudio = useCallback((targetVolume: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = targetVolume > audioRef.current.volume ? 0.05 : -0.05;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      const nextVol = audioRef.current.volume + step;

      if ((step > 0 && nextVol >= targetVolume) || (step < 0 && nextVol <= targetVolume)) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        if (onComplete) onComplete();
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, 45);
  }, []);

  const playWithFadeIn = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeAudio(1.0);
      })
      .catch((err) => {
        console.warn("Audio playback was prevented by browser policy:", err);
      });
  }, [fadeAudio]);

  const pauseWithFadeOut = useCallback(() => {
    if (!audioRef.current) return;
    fadeAudio(0, () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    });
  }, [fadeAudio]);

  useEffect(() => {
    const handleStartPlayback = () => {
      setHasStarted(true);
      // Wait for audio element to bind source before playing
      setTimeout(() => {
        if (audioConfig?.enabled !== false) {
          playWithFadeIn();
        }
      }, 50);
    };

    window.addEventListener("wedding:play_audio", handleStartPlayback);

    return () => {
      window.removeEventListener("wedding:play_audio", handleStartPlayback);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [audioConfig?.enabled, playWithFadeIn]);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setTimeout(() => playWithFadeIn(), 50);
      return;
    }

    if (isPlaying) {
      pauseWithFadeOut();
    } else {
      playWithFadeIn();
    }
  };

  if (audioConfig?.enabled === false) return null;

  return (
    <div
      className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] right-4 z-40 sm:bottom-6 sm:right-6 select-none"
      aria-label="Pemain Muzik Latar Majlis"
    >
      {/* Audio element is lazy-loaded with preload="none" until invitation is opened */}
      <audio
        ref={audioRef}
        src={hasStarted ? audioSource : undefined}
        loop={audioConfig?.autoLoop !== false}
        preload={hasStarted ? "auto" : "none"}
      />

      <div className="group relative flex items-center">
        {/* Floating Tooltip with Track Info */}
        <div className="pointer-events-none absolute bottom-full right-0 mb-3 hidden items-center gap-2.5 whitespace-nowrap rounded-2xl border border-[#E8E2D8] bg-[#2D3748]/95 px-4 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-all group-hover:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#556B2F]/40 text-[#D4AF37]">
            {isPlaying ? (
              <Volume2 size={15} />
            ) : (
              <Music size={14} />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
              {isPlaying ? "Sedang Dimainkan" : "Muzik Latar"}
            </span>
            <span className="font-serif font-bold text-[#FAF7F2] max-w-[200px] truncate">
              {audioConfig?.title || "Instrumental Melayu Asli"}
            </span>
            {audioConfig?.artist && (
              <span className="text-[10px] text-[#A2B09B]">
                {audioConfig.artist}
              </span>
            )}
          </div>
        </div>

        {/* Floating Audio Button with 44pt Touch Target */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda Muzik Latar (Pause)" : "Mainkan Muzik Latar (Play)"}
          className={`relative flex items-center justify-center min-w-[44px] min-h-[44px] gap-2 rounded-full p-2.5 sm:p-3 shadow-sm transition-all duration-300 focus:outline-none cursor-pointer ${
            isPlaying
              ? "bg-[#2D3748] text-[#D4AF37] border-2 border-[#D4AF37]/80 shadow-[0_4px_16px_rgba(212,175,55,0.25)]"
              : "border-2 border-[#E8E2D8] bg-[#FAF7F2]/95 text-[#556377] backdrop-blur-md hover:border-[#D4AF37] hover:text-[#2D3748] hover:scale-105 active:scale-95"
          }`}
        >
          {/* Vinyl Disc Icon */}
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <>
                <Disc
                  size={24}
                  className={`text-[#D4AF37] ${isTabVisible ? "animate-spin-slow" : ""}`}
                />
                <span className="h-2 w-2 rounded-full bg-[#FAF7F2] absolute" />
              </>
            ) : (
              <VolumeX size={20} className="text-[#556377]" />
            )}
          </div>

          {/* Sound Wave Bars (Paused if tab hidden) */}
          {isPlaying && isTabVisible && (
            <div className="flex items-end gap-0.5 px-1 h-3.5">
              <span className="w-0.5 bg-[#D4AF37] rounded-full animate-[soundWave_0.8s_ease-in-out_infinite]" style={{ height: "60%" }} />
              <span className="w-0.5 bg-[#7D8B74] rounded-full animate-[soundWave_1.1s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.2s" }} />
              <span className="w-0.5 bg-[#D4AF37] rounded-full animate-[soundWave_0.9s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "0.4s" }} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
