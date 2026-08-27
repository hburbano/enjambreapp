import { useNavigate } from "react-router-dom";
import { ReportCard } from "@enjambres/ui";
import { mockReports } from "../data/mock";
import { BeeIcon, beeSize } from "../icons";
import { usePageMeta } from "../hooks/usePageMeta";

export function ReportsPage() {
  usePageMeta(
    "Reportes",
    "Lista de enjambres reportados en Colombia. Revisa estado, ciudad y detalle de cada reporte.",
  );
  const navigate = useNavigate();
  const sorted = [...mockReports].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-4 py-4 md:px-6">
      <h1 className="font-display text-2xl font-extrabold text-brand-ink">
        Reportes
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Datos de ejemplo del POC — sin backend todavía.
      </p>
      <ul className="mt-4 flex flex-col gap-3 pb-4">
        {sorted.map((report) => (
          <li key={report.id}>
            <ReportCard
              report={report}
              icon={<BeeIcon size={beeSize.list} />}
              onViewDetail={(r) => navigate(`/reportes/${r.id}`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
