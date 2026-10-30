"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Music, VolumeX, Disc, Volume2 } from "lucide-react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";

export default function AudioPlayer() {
  const weddingConfig = useWeddingConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const audioConfig = weddingConfig.audio || weddingConfig.music;
  const audioSource =
    audioConfig?.src || audioConfig?.source || "/audio/wedding-bgm.mp3";

  // Soft Fade Audio Transition (fade-in or fade-out)
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
      if (audioConfig?.enabled !== false && !isPlaying) {
        playWithFadeIn();
      }
    };

    window.addEventListener("wedding:play_audio", handleStartPlayback);

    return () => {
      window.removeEventListener("wedding:play_audio", handleStartPlayback);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [audioConfig?.enabled, isPlaying, playWithFadeIn]);

  const togglePlay = () => {
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
      <audio
        ref={audioRef}
        src={audioSource}
        loop={audioConfig?.autoLoop !== false}
        preload="auto"
      />

      <div className="group relative flex items-center">
        {/* Floating Tooltip with Track & Status Info */}
        <div className="pointer-events-none absolute bottom-full right-0 mb-3 hidden items-center gap-2.5 whitespace-nowrap rounded-2xl border border-[#EAD5D5] bg-[#3D2429]/95 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md transition-all group-hover:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D88A96]/20 text-[#D4A373]">
            {isPlaying ? (
              <Volume2 size={15} className="animate-pulse" />
            ) : (
              <Music size={14} />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A373]">
              {isPlaying ? "Sedang Dimainkan" : "Muzik Latar"}
            </span>
            <span className="font-serif font-bold text-[#FFF8F8] max-w-[200px] truncate">
              {audioConfig?.title || "Instrumental Melayu Asli"}
            </span>
            {audioConfig?.artist && (
              <span className="text-[10px] text-[#FADBD8]">
                {audioConfig.artist}
              </span>
            )}
          </div>
        </div>

        {/* Main Floating Audio Control Widget with 44pt Touch Target */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda Muzik Latar (Pause)" : "Mainkan Muzik Latar (Play)"}
          className={`relative flex items-center justify-center min-w-[44px] min-h-[44px] gap-2.5 rounded-full p-2.5 sm:p-3 shadow-sm transition-all duration-300 focus:outline-none cursor-pointer ${
            isPlaying
              ? "scale-105 bg-gradient-to-tr from-[#3D2429] via-[#4A2E35] to-[#2B191D] text-[#D4A373] border-2 border-[#D4A373] shadow-rose active:scale-[0.98]"
              : "border-2 border-[#EAD5D5] bg-white/95 text-[#7A555C] backdrop-blur-md hover:border-[#D88A96] hover:text-[#C56D7E] hover:scale-105 active:scale-[0.98]"
          }`}
        >
          {/* Pulsating Sound Wave Ring Ripple (GPU accelerated) */}
          {isPlaying && (
            <span className="absolute -inset-1.5 animate-ping rounded-full border border-[#D4A373]/50 opacity-60 pointer-events-none" />
          )}

          {/* Spinning Vinyl Disc Motif */}
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <>
                <Disc size={26} className="animate-spin-slow text-[#D4A373]" />
                {/* Center Vinyl Rose Gold Core */}
                <span className="absolute h-2.5 w-2.5 rounded-full bg-[#FADBD8] shadow-inner" />
              </>
            ) : (
              <VolumeX size={22} className="text-[#7A555C]" />
            )}
          </div>

          {/* Pulsating Sound Wave Bars (Visual Equalizer) */}
          {isPlaying && (
            <div className="flex items-end gap-1 px-1 h-4">
              <span className="w-1 bg-[#D88A96] rounded-full animate-[soundWave_0.8s_ease-in-out_infinite]" style={{ height: "60%" }} />
              <span className="w-1 bg-[#FADBD8] rounded-full animate-[soundWave_1.1s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.2s" }} />
              <span className="w-1 bg-[#D4A373] rounded-full animate-[soundWave_0.9s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "0.4s" }} />
              <span className="w-1 bg-[#E2B686] rounded-full animate-[soundWave_1.2s_ease-in-out_infinite]" style={{ height: "45%", animationDelay: "0.1s" }} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
