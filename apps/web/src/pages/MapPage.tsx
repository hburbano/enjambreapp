import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Report } from "@enjambres/types";
import { Button } from "@enjambres/ui";
import { useNavigate } from "react-router-dom";
import { mockReports } from "../data/mock";

const COLOMBIA_CENTER: [number, number] = [4.57, -74.3];
const DEFAULT_ZOOM = 5.4;

function beePinIcon() {
  return L.divIcon({
    className: "enjambres-pin",
    html: `<div style="
      width:36px;height:36px;border-radius:9999px;
      background:#F5C518;border:2px solid #111;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 10px rgba(0,0,0,.25);font-size:18px;
    ">🐝</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34],
  });
}

function clusterIcon(count: number) {
  return L.divIcon({
    className: "enjambres-pin",
    html: `<div style="
      width:40px;height:40px;border-radius:9999px;
      background:#111;color:#fff;font-weight:800;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 12px rgba(0,0,0,.35);font-size:14px;
      font-family:Nunito,sans-serif;
    ">${count}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

/** Simple grid clustering for the POC (no extra plugin). */
function clusterReports(reports: Report[], cell = 1.2) {
  const buckets = new Map<string, Report[]>();
  for (const report of reports) {
    if (report.status === "resolved") continue;
    const key = `${Math.round(report.lat / cell)}:${Math.round(report.lng / cell)}`;
    const list = buckets.get(key) ?? [];
    list.push(report);
    buckets.set(key, list);
  }
  return [...buckets.values()];
}

function LocateControl() {
  const map = useMap();
  return (
    <button
      type="button"
      className="absolute right-3 bottom-24 z-[1000] flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg shadow-md outline-none focus-visible:ring-2 focus-visible:ring-brand-ink"
      aria-label="Centrar en mi ubicación"
      onClick={() => {
        if (!navigator.geolocation) {
          map.setView(COLOMBIA_CENTER, DEFAULT_ZOOM);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            map.flyTo([pos.coords.latitude, pos.coords.longitude], 13, {
              duration: 1.2,
            });
          },
          () => map.setView(COLOMBIA_CENTER, DEFAULT_ZOOM),
          { enableHighAccuracy: true, timeout: 8000 },
        );
      }}
    >
      ◎
    </button>
  );
}

export function MapPage() {
  const navigate = useNavigate();
  const icon = useMemo(() => beePinIcon(), []);
  const clusters = useMemo(() => clusterReports(mockReports), []);

  return (
    <div className="relative h-full">
      <MapContainer
        center={COLOMBIA_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
        />
        {clusters.map((group) => {
          if (group.length === 1) {
            const report = group[0];
            return (
              <Marker
                key={report.id}
                position={[report.lat, report.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => navigate(`/reportes/${report.id}`),
                }}
              />
            );
          }
          const lat =
            group.reduce((sum, r) => sum + r.lat, 0) / group.length;
          const lng =
            group.reduce((sum, r) => sum + r.lng, 0) / group.length;
          return (
            <Marker
              key={`c-${group.map((r) => r.id).join("-")}`}
              position={[lat, lng]}
              icon={clusterIcon(group.length)}
              eventHandlers={{
                click: () => navigate("/reportes"),
              }}
            />
          );
        })}
        <LocateControl />
      </MapContainer>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] p-4">
        <div className="pointer-events-auto mx-auto max-w-md">
          <Button
            className="w-full py-3.5 text-base shadow-lg"
            onPress={() => {
              // Report flow lands in v1; for POC jump to list with intent.
              window.alert(
                "Pronto podrás reportar con foto y ubicación. Por ahora explora el mapa y los reportes de ejemplo.",
              );
            }}
          >
            <span aria-hidden>🐝</span> Reportar enjambre
          </Button>
        </div>
      </div>
    </div>
  );
}
