"use client";

import React, { useState } from "react";
import { Heart, Clock, MapPin, ChevronRight, Zap } from "lucide-react";
import { Venue } from "@/data/mockVenues";

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}

export default function VenueCard({ venue, onSelect }: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      onClick={() => onSelect(venue)}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-[#121622]/80 hover:bg-slate-50 dark:hover:bg-[#181D2D] border border-slate-200/80 dark:border-white/[0.08] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-300 overflow-hidden flex flex-col shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Photo Container with rounded corners */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-zinc-900">
        {/* Real Food Image */}
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark subtle gradient overlay on top for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Favorite Heart Button in top right */}
        <button
          type="button"
          aria-label="В избранное"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 active:scale-90"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-white/90 hover:text-white"
            }`}
          />
        </button>

        {/* Bottom image overlay with distance & address */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white/90 font-medium">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-orange-400" />
            {venue.distance} • {venue.address}
          </span>
          <span className="bg-amber-500/90 text-black font-bold px-2 py-0.5 rounded-md shadow-sm">
            {venue.bonuses}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
              {venue.name}
            </h3>
          </div>

          {/* Metrics Line: Prep time • Takeaway badge */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-600 dark:text-gray-300 font-medium my-2">
            {/* Preparation time */}
            <div className="inline-flex items-center gap-1 text-slate-700 dark:text-gray-200">
              <Clock className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
              <span>{venue.prepTime}</span>
            </div>

            <span className="text-slate-400 dark:text-gray-500">•</span>

            {/* Takeaway badge */}
            <div className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 font-bold px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-500/30 text-[11px]">
              <Zap className="w-3 h-3 text-rose-500 dark:text-rose-400" />
              <span>{venue.badgeTag}</span>
            </div>
          </div>

          {/* Popular dishes tags */}
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-2 line-clamp-1">
            {venue.tags.join(" • ")}
          </p>
        </div>

        {/* Bottom action bar without 0% markup */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-end text-xs">
          <span className="text-slate-600 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-white font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
            Предзаказ <ChevronRight className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </span>
        </div>
      </div>
    </div>
  );
}
