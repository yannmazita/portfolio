// scripts/generate-sitemap.ts
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const PROD_DOMAIN = "https://apexguessr.com";
// public-facing, indexable routes.
const publicRoutes: string[] = ["/"];

async function generateSitemap() {
  console.log("Generating sitemap...");

  const stream = new SitemapStream({ hostname: PROD_DOMAIN });

  publicRoutes.forEach((route) => {
    stream.write({
      url: route,
      changefreq: "weekly", // Default change frequency
      priority: route === "/" ? 1.0 : 0.8, // homepage higher priority
      lastmod: new Date().toISOString().split("T")[0], // Set lastmod to today's date
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
    process.exit(1); // Exit with an error code to fail the build
  }
}

generateSitemap();
