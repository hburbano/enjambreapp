import { mockArticles } from "../data/mock";
import { usePageMeta } from "../hooks/usePageMeta";

export function LearnPage() {
  usePageMeta(
    "Aprende",
    "Guías para reportar enjambres con seguridad, entender por qué importan las abejas y cómo funciona el rescate.",
  );

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-4 py-4 md:px-6">
      <h1 className="font-display text-2xl font-extrabold text-brand-ink">
        Aprende
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Guías rápidas para reportar y proteger abejas con seguridad.
      </p>

      <section className="mt-5 rounded-2xl bg-brand-ink px-4 py-5 text-white">
        <h2 className="font-display text-lg font-extrabold tracking-wide uppercase">
          ¿Cómo funciona?
        </h2>
        <ol className="mt-3 space-y-3 text-sm leading-relaxed text-white/90">
          <li>
            <span className="font-bold text-brand-yellow">1. Reporta</span> —
            toma una foto y envía la ubicación.
          </li>
          <li>
            <span className="font-bold text-brand-yellow">2. Localizamos</span> —
            el enjambre aparece en el mapa.
          </li>
          <li>
            <span className="font-bold text-brand-yellow">3. Rescatamos</span> —
            contactamos rescatistas y apicultores.
          </li>
          <li>
            <span className="font-bold text-brand-yellow">4. Protegemos</span> —
            las abejas se reubican con seguridad.
          </li>
        </ol>
      </section>

      <ul className="mt-4 flex flex-col gap-3 pb-6">
        {mockArticles.map((article) => (
          <li
            key={article.id}
            className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
          >
            <h3 className="font-display text-base font-bold">{article.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{article.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              {article.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
