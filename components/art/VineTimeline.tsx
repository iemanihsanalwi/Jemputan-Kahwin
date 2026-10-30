"use client";

import React from "react";
import BotanicalIconBadge from "./BotanicalIconBadge";
import { Clock, UserCheck, Sparkles, Heart, Camera, CheckCircle } from "lucide-react";

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  iconName?: string;
}

interface VineTimelineProps {
  schedule: ScheduleItem[];
  className?: string;
}

/**
 * VineTimeline - An organic climbing vine component in romantic rose gold and dusty rose.
 * Features:
 * - Rose-tinted continuous winding timeline stem
 * - Dusty rose floral rosette markers at each milestone
 * - Delicate rose-taupe leaf offshoots extending toward time badges
 */
export default function VineTimeline({ schedule, className = "" }: VineTimelineProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCheck":
        return <UserCheck size={16} className="text-[#C56D7E]" />;
      case "Sparkles":
        return <Sparkles size={16} className="text-[#D4A373]" />;
      case "Heart":
        return <Heart size={16} className="text-[#D88A96]" />;
      case "Camera":
        return <Camera size={16} className="text-[#C56D7E]" />;
      case "CheckCircle":
        return <CheckCircle size={16} className="text-[#B56576]" />;
      default:
        return <Clock size={16} className="text-[#C56D7E]" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* SVG Continuous Winding Vine Track (Absolute Behind Timeline Nodes) */}
      <div className="absolute left-[20px] sm:left-[118px] top-6 bottom-8 w-12 pointer-events-none select-none z-0" aria-hidden="true">
        <svg
          viewBox="0 0 48 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`${idPrefix}-vineGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4A373" />
              <stop offset="35%" stopColor="#D88A96" />
              <stop offset="70%" stopColor="#C56D7E" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-leafGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FADBD8" />
              <stop offset="60%" stopColor="#D88A96" />
              <stop offset="100%" stopColor="#B56576" />
            </linearGradient>

            <radialGradient id={`${idPrefix}-budGrad`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FADBD8" />
              <stop offset="100%" stopColor="#D88A96" />
            </radialGradient>
          </defs>

          {/* Continuous Sinuous Climbing Vine Stem */}
          <path
            d="M 24 0 
               C 34 60, 14 120, 24 180 
               C 34 240, 14 300, 24 360 
               C 34 420, 14 480, 24 540 
               C 30 570, 20 590, 24 600"
            stroke={`url(#${idPrefix}-vineGrad)`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* Secondary Delicate Tendril Spirals */}
          <path
            d="M 24 90 C 38 85, 46 95, 42 105 C 38 112, 28 108, 30 100"
            stroke="#D4A373"
            strokeWidth="1.2"
            fill="none"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 24 270 C 10 265, 2 275, 6 285 C 10 292, 20 288, 18 280"
            stroke="#D4A373"
            strokeWidth="1.2"
            fill="none"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 24 450 C 38 445, 46 455, 42 465 C 38 472, 28 468, 30 460"
            stroke="#D4A373"
            strokeWidth="1.2"
            fill="none"
            opacity="0.85"
            vectorEffect="non-scaling-stroke"
          />

          {/* Leaf Offshoots Along the Sinuous Path (Dusty Rose & Blossom) */}
          <path
            d="M 24 60 C 34 52, 42 56, 38 68 C 30 70, 26 66, 24 60 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
          <path
            d="M 24 130 C 12 122, 4 128, 8 138 C 16 140, 22 136, 24 130 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
          <path
            d="M 24 220 C 34 212, 44 218, 40 228 C 32 230, 26 226, 24 220 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
          <path
            d="M 24 310 C 12 302, 4 308, 8 318 C 16 320, 22 316, 24 310 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
          <path
            d="M 24 400 C 34 392, 44 398, 40 408 C 32 410, 26 406, 24 400 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
          <path
            d="M 24 490 C 12 482, 4 488, 8 498 C 16 500, 22 496, 24 490 Z"
            fill={`url(#${idPrefix}-leafGrad)`}
          />
        </svg>
      </div>

      {/* Timeline Checkpoint Nodes */}
      <div className="space-y-10 sm:space-y-12 pl-12 sm:pl-36">
        {schedule.map((item, index) => (
          <div key={index} className="group relative">
            {/* Blooming Rosette / Bud Milestone Node */}
            <div className="absolute -left-[44px] sm:-left-[34px] top-0.5 z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border-2 border-[#D4A373]">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <defs>
                    <linearGradient id={`nodePetal-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#FADBD8" />
                      <stop offset="100%" stopColor="#D88A96" />
                    </linearGradient>
                  </defs>

                  {/* 5 Blooming Rosette Petals */}
                  {[0, 72, 144, 216, 288].map((deg, i) => (
                    <path
                      key={i}
                      d="M 16 16 C 13 8, 19 8, 16 16 Z"
                      transform={`rotate(${deg} 16 16)`}
                      fill={`url(#nodePetal-${index})`}
                      stroke="#D4A373"
                      strokeWidth="0.8"
                    />
                  ))}

                  {/* Center Golden/Mulberry Pistil Dot */}
                  <circle cx="16" cy="16" r="3" fill="#D4A373" />
                  <circle cx="16" cy="16" r="1.5" fill="#FAF0F2" />
                </svg>
              </div>
            </div>

            {/* Time Indicator Badge (Desktop Left Offset, Mobile Top) */}
            <div className="sm:absolute sm:-left-36 sm:top-1 sm:w-24 sm:text-right">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#EAD5D5] bg-[#FFF8F8] px-3 py-1 font-mono text-xs font-bold text-[#3D2429] shadow-xs backdrop-blur-xs">
                {item.time}
              </span>
            </div>

            {/* Event Activity Card & Details */}
            <div className="rounded-2xl border border-[#EAD5D5] bg-white/85 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#D4A373] hover:shadow-rose">
              <h4 className="flex items-center gap-2.5 font-serif text-lg font-bold text-[#3D2429] transition-colors group-hover:text-[#B56576]">
                <BotanicalIconBadge size="sm" variant="rose">
                  {getIcon(item.iconName)}
                </BotanicalIconBadge>
                <span>{item.title}</span>
              </h4>

              {item.description && (
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7A555C] font-sans pl-10">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
