import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "@enjambres/ui";
import { AppHeader } from "./components/AppHeader";
import { MapPage } from "./pages/MapPage";
import { ReportsPage } from "./pages/ReportsPage";
import { LearnPage } from "./pages/LearnPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ReportDetailPage } from "./pages/ReportDetailPage";

const navItems = [
  { id: "mapa", label: "Mapa", href: "/", icon: "📍" },
  { id: "reportes", label: "Reportes", href: "/reportes", icon: "📋" },
  { id: "aprende", label: "Aprende", href: "/aprende", icon: "📖" },
  { id: "perfil", label: "Perfil", href: "/perfil", icon: "👤" },
];

function activeNavId(pathname: string): string {
  if (pathname.startsWith("/reportes")) return "reportes";
  if (pathname.startsWith("/aprende")) return "aprende";
  if (pathname.startsWith("/perfil")) return "perfil";
  return "mapa";
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideChrome = location.pathname.startsWith("/reportes/");

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col bg-brand-cream shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
      {!hideChrome ? <AppHeader /> : null}
      <main className="min-h-0 flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
          <Route path="/reportes/:id" element={<ReportDetailPage />} />
          <Route path="/aprende" element={<LearnPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideChrome ? (
        <BottomNav
          items={navItems}
          activeId={activeNavId(location.pathname)}
          onNavigate={(href) => navigate(href)}
        />
      ) : null}
    </div>
  );
}
