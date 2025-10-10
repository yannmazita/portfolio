// scripts/generate-sitemap.ts
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const PROD_DOMAIN = "https://mazita.dev";

// only root as we're using hash routes
// Google will discover other routes through internal links
const publicRoutes: string[] = ["/"]; // hash routes aren't indexed separately

async function generateSitemap() {
  console.log("Generating sitemap...");

  const stream = new SitemapStream({ hostname: PROD_DOMAIN });

  publicRoutes.forEach((route) => {
    stream.write({
      url: route,
      changefreq: "weekly",
      priority: 1.0, // Root page is highest priority
      lastmod: new Date().toISOString().split("T")[0],
    });
  });

  stream.end();

  try {
    const sitemapXml = (await streamToPromise(stream)).toString();
    const outputPath = "public/sitemap.xml";
    writeFileSync(outputPath, sitemapXml);
    console.log(`Sitemap successfully generated at ${outputPath}`);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

await generateSitemap();
