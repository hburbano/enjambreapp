import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/reportes", changefreq: "daily", priority: "0.8" },
  { path: "/aprende", changefreq: "weekly", priority: "0.7" },
  { path: "/perfil", changefreq: "monthly", priority: "0.3" },
];

function normalizeSiteUrl(raw: string | undefined): string {
  return (raw ?? "").trim().replace(/\/$/, "");
}

function absolute(base: string, routePath: string): string {
  if (!base) return routePath;
  return routePath === "/" ? `${base}/` : `${base}${routePath}`;
}

function robotsTxt(base: string): string {
  const sitemap = base ? `${base}/sitemap.xml` : "/sitemap.xml";
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap}`, ""].join(
    "\n",
  );
}

function sitemapXml(base: string): string {
  const urls = ROUTES.map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${absolute(base, routePath)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/**
 * Injects absolute SEO URLs into index.html and rewrites robots.txt /
 * sitemap.xml in the build output when `VITE_SITE_URL` is set.
 */
export function enjambresSeoPlugin(siteUrl: string | undefined): Plugin {
  const base = normalizeSiteUrl(siteUrl);

  return {
    name: "enjambres-seo",
    transformIndexHtml(html) {
      const canonical = absolute(base, "/");
      const ogImage = absolute(base, "/og-image.png");
      return html
        .replaceAll("%SITE_URL%", base || canonical)
        .replaceAll("%CANONICAL_URL%", canonical)
        .replaceAll("%OG_IMAGE_URL%", ogImage);
    },
    writeBundle(options) {
      const outDir = options.dir;
      if (!outDir) return;
      fs.writeFileSync(path.join(outDir, "robots.txt"), robotsTxt(base));
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml(base));
    },
  };
}
