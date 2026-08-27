import type { Report } from "@enjambres/types";
import { Button } from "./Button";

function formatRelativeTime(iso: string, now = Date.now()): string {
  const diffMs = now - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Hace un momento";
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} hora${hours === 1 ? "" : "s"}`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days === 1 ? "" : "s"}`;
}

const statusLabel: Record<Report["status"], string> = {
  reported: "Reportado",
  visible: "Visible en el mapa",
  in_rescue: "En rescate",
  resolved: "Resuelto",
};

export interface ReportCardProps {
  report: Report;
  onViewDetail?: (report: Report) => void;
}

export function ReportCard({ report, onViewDetail }: ReportCardProps) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xl"
          aria-hidden
        >
          🐝
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-brand-ink">
            {report.title}
          </h3>
          <p className="mt-0.5 text-sm text-neutral-600">
            {report.city}, {report.department}
          </p>
          <p className="text-sm text-neutral-500">{report.neighborhood}</p>
          <p className="mt-2 text-sm font-semibold text-brand-yellow-dark">
            {formatRelativeTime(report.createdAt)}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {statusLabel[report.status]}
          </p>
        </div>
      </div>
      {onViewDetail ? (
        <Button
          className="mt-4 w-full"
          onPress={() => onViewDetail(report)}
        >
          Ver detalle
        </Button>
      ) : null}
    </article>
  );
}
