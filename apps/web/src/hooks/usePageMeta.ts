import { useEffect } from "react";

export const DEFAULT_TITLE =
  "Enjambres Colombia — reporta y protege a las abejas";

export const DEFAULT_DESCRIPTION =
  "Reporta enjambres de abejas en Colombia. Mapa en vivo, rescate comunitario y guías para proteger polinizadores. Juntos protegemos a las abejas.";

function setMetaByName(name: string, content: string) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) el.setAttribute("content", content);
}

/**
 * Updates document title + description for client-side route changes.
 * Static Open Graph tags in index.html remain the source of truth for
 * link-preview crawlers (they typically do not execute SPA JS).
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const nextTitle = title
      ? `${title} · Enjambres Colombia`
      : DEFAULT_TITLE;
    const nextDescription = description ?? DEFAULT_DESCRIPTION;

    document.title = nextTitle;
    setMetaByName("description", nextDescription);
    setMetaByProperty("og:title", nextTitle);
    setMetaByProperty("og:description", nextDescription);
    setMetaByName("twitter:title", nextTitle);
    setMetaByName("twitter:description", nextDescription);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaByName("description", DEFAULT_DESCRIPTION);
      setMetaByProperty("og:title", DEFAULT_TITLE);
      setMetaByProperty("og:description", DEFAULT_DESCRIPTION);
      setMetaByName("twitter:title", DEFAULT_TITLE);
      setMetaByName("twitter:description", DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
