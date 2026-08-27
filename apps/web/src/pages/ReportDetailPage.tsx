import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@enjambres/ui";
import { getReportById } from "../data/mock";
import { ArrowLeftIcon, BeeIcon, beeSize } from "../icons";

const statusLabel = {
  reported: "Reportado",
  visible: "Visible en el mapa",
  in_rescue: "En rescate",
  resolved: "Resuelto",
} as const;

export function ReportDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const report = getReportById(id);

  if (!report) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-lg font-bold">Reporte no encontrado</p>
        <Button onPress={() => navigate("/reportes")}>Volver a reportes</Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="safe-top border-b border-black/8 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-3 md:px-6">
          <Button variant="ghost" className="px-2 py-2" onPress={() => navigate(-1)}>
            <ArrowLeftIcon size={18} />
            Atrás
          </Button>
          <h1 className="font-display text-lg font-extrabold">Detalle</h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-5 md:px-6">
        <div className="flex h-40 items-center justify-center rounded-2xl bg-brand-yellow/40 text-brand-ink">
          <BeeIcon size={beeSize.hero} />
        </div>
        <h2 className="mt-4 font-display text-2xl font-extrabold">
          {report.title}
        </h2>
        <p className="mt-1 text-neutral-700">
          {report.city}, {report.department}
        </p>
        <p className="text-neutral-500">{report.neighborhood}</p>
        <p className="mt-3 inline-flex rounded-full bg-brand-ink px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
          {statusLabel[report.status]}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          Este es un reporte de ejemplo del POC. En la versión con backend
          verás la foto, el historial de estado y cómo contactar a
          rescatistas.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Button onPress={() => navigate("/")}>Ver en el mapa</Button>
          <Link
            to="/reportes"
            className="text-center text-sm font-semibold text-neutral-600 underline-offset-2 hover:underline"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    </div>
  );
}
