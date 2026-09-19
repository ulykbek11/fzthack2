"use client";

import { useState } from "react";
import { Clock3, Heart, Star } from "lucide-react";
import { Venue } from "@/data/mockVenues";

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}

export default function VenueCard({ venue, onSelect }: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article
      onClick={() => onSelect(venue)}
      className="group min-w-0 cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#f0f0f0]">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        <button
          type="button"
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={(event) => {
            event.stopPropagation();
            setIsFavorite((value) => !value);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#202124] shadow-md transition active:scale-90"
        >
          <Heart className={`h-[19px] w-[19px] ${isFavorite ? "fill-[#ff2d55] text-[#ff2d55]" : ""}`} />
        </button>

        <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#202124] shadow-sm">
          {venue.distance}
        </span>
      </div>

      <div className="px-0.5 pt-3">
        <h3 className="truncate text-[17px] font-extrabold tracking-[-0.02em] text-[#1f1f1f] sm:text-lg">
          {venue.name}
        </h3>
        <p className="mt-1 truncate text-[13px] text-[#707070]">{venue.category} · {venue.address}</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-[#222]">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" /> {venue.prepTime}
          </span>
          <span className="text-[#a0a0a0]">·</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#ffc244] text-[#ffc244]" /> {venue.ratingScore}
          </span>
          <span className="font-normal text-[#777]">({venue.reviewsCount})</span>
        </div>
      </div>
    </article>
  );
}
