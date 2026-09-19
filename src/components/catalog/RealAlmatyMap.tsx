"use client";

import React, { useEffect, useRef, useState } from "react";
import { Venue } from "@/data/mockVenues";
import { MapPin, Navigation, Clock, Coins, ChevronRight, Layers } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface RealAlmatyMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
}

export default function RealAlmatyMap({
  venues,
  selectedVenue,
  onSelectVenue,
}: RealAlmatyMapProps) {
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapStyle, setMapStyle] = useState<"dark" | "voyager">(theme === "dark" ? "dark" : "voyager");

  // Keep map style in sync if theme changes
  useEffect(() => {
    setMapStyle(theme === "dark" ? "dark" : "voyager");
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    // Dynamically load Leaflet on client-side
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // If map already initialized, remove it before re-init
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Almaty Center coordinates: [43.2450, 76.9420]
      const almatyCenter: [number, number] = [43.2485, 76.9450];

      const map = L.map(mapContainerRef.current, {
        center: almatyCenter,
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Zoom Control at bottom right
      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(map);

      // Choose CartoDB Tiles (Dark Matter or Voyager)
      const tileUrl =
        mapStyle === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      mapInstanceRef.current = map;

      // Clear existing markers reference
      markersRef.current = {};

      // Add custom styled markers for each venue
      venues.forEach((venue) => {
        const iconSvg =
          venue.categorySlug === "coffee"
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`
            : venue.categorySlug === "burgers"
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
            : venue.categorySlug === "pizza"
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16Z"/></svg>`
            : venue.categorySlug === "asian"
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1c0 5-4 9-9 9s-9-4-9-9a1 1 0 0 1 1-1Z"/><path d="M12 4v3"/><path d="M8 4v3"/><path d="M16 4v3"/></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v18"/><path d="M5 2c0 2.5 1.5 4 3 5v13"/><path d="M5 2v5"/></svg>`;

        // Custom HTML Marker Icon with pulsing glow and name pill
        const customIcon = L.divIcon({
          className: "custom-venue-pin",
          html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <!-- Label tag -->
              <div style="
                background: rgba(15, 19, 30, 0.92);
                color: #ffffff;
                font-family: system-ui, sans-serif;
                font-size: 11px;
                font-weight: 800;
                padding: 3px 8px;
                border-radius: 8px;
                border: 1px solid rgba(255, 87, 34, 0.5);
                box-shadow: 0 4px 14px rgba(0,0,0,0.6);
                white-space: nowrap;
                margin-bottom: 5px;
                pointer-events: none;
                transition: transform 0.2s;
              ">
                ${venue.name}
              </div>

              <!-- Pin Circle with pulse -->
              <div style="
                width: 38px;
                height: 38px;
                border-radius: 14px;
                background: linear-gradient(135deg, #FF5722 0%, #F59E0B 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 20px rgba(255, 87, 34, 0.6);
                border: 2px solid #ffffff;
                transition: transform 0.2s;
              ">
                ${iconSvg}
              </div>
            </div>
          `,
          iconSize: [120, 65],
          iconAnchor: [60, 65],
          popupAnchor: [0, -65],
        });

        const marker = L.marker([venue.lat, venue.lng], { icon: customIcon }).addTo(map);

        // Custom Popup on click
        const popupContent = `
          <div style="
            background: #0f131e;
            color: #ffffff;
            font-family: system-ui, sans-serif;
            border-radius: 16px;
            padding: 12px;
            width: 250px;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 16px 32px rgba(0,0,0,0.6);
          ">
            <div style="font-size: 14px; font-weight: 800; margin-bottom: 4px; color: #fff;">
              ${venue.name}
            </div>
            <div style="font-size: 11px; color: #9ca3af; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" style="flex-shrink:0;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${venue.address}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 10px;">
              <span style="color: #f97316; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${venue.prepTime}
              </span>
              <span style="color: #f59e0b; font-weight: 700;">${venue.bonuses}</span>
            </div>
            <button
              id="popup-btn-${venue.id}"
              style="
                width: 100%;
                background: linear-gradient(to right, #ea580c, #d97706);
                color: #ffffff;
                font-size: 12px;
                font-weight: 700;
                padding: 8px 12px;
                border-radius: 10px;
                border: none;
                cursor: pointer;
                transition: opacity 0.2s;
              "
            >
              Открыть меню и предзаказ
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: true,
          className: "qos-leaflet-popup",
        });

        marker.on("popupopen", () => {
          setTimeout(() => {
            const btn = document.getElementById(`popup-btn-${venue.id}`);
            if (btn) {
              btn.onclick = () => {
                onSelectVenue(venue);
              };
            }
          }, 50);
        });

        markersRef.current[venue.id] = marker;
      });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [venues, mapStyle]);

  // Handle selectedVenue flyTo
  useEffect(() => {
    if (selectedVenue && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedVenue.lat, selectedVenue.lng], 16, {
        animate: true,
        duration: 1.2,
      });

      const marker = markersRef.current[selectedVenue.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedVenue]);

  const resetToCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([43.2485, 76.9450], 14, {
        animate: true,
      });
    }
  };

  return (
    <div className="relative w-full h-[650px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl bg-slate-100 dark:bg-[#080A10]">
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="glass-panel px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg flex items-center gap-2 text-xs bg-white/90 dark:bg-[#0f131e]/85">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-900 dark:text-white">Карта Алматы (OpenStreetMap / CartoDB)</span>
          <span className="text-slate-500 dark:text-gray-400">• {venues.length} заведений</span>
        </div>

        {/* Style toggle */}
        <button
          onClick={() => setMapStyle(mapStyle === "dark" ? "voyager" : "dark")}
          className="glass-panel px-3 py-2 rounded-2xl border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg text-xs font-semibold text-slate-700 dark:text-gray-200 hover:text-slate-950 dark:hover:text-white bg-white/90 dark:bg-[#0f131e]/85 flex items-center gap-1.5 transition-colors"
          title="Сменить тему карты"
        >
          <Layers className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
          <span>{mapStyle === "dark" ? "Тёмная" : "Светлая"}</span>
        </button>
      </div>

      {/* Reset Location Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={resetToCenter}
          className="glass-panel px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-lg text-xs font-bold text-slate-900 dark:text-white hover:border-orange-500/50 bg-white/90 dark:bg-[#0f131e]/85 flex items-center gap-1.5 transition-all"
        >
          <Navigation className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
          <span>Центр Алматы</span>
        </button>
      </div>

      {/* Bottom overlay with quick street reference */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2">
        <div className="glass-panel px-3.5 py-2 rounded-xl text-xs text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 backdrop-blur-md bg-white/90 dark:bg-[#0f131e]/85">
          <span>пр. Абая • ул. Достык • ул. Панфилова • пр. Абылай хана</span>
        </div>
      </div>
    </div>
  );
}
