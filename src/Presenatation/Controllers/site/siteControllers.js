const puppeteer = require("puppeteer");

class SiteController {
  constructor(siteService) {
    this.siteService = siteService;
  }

  // Get all website data
  async getSites(req, reply) {
    try {
      const sites = await this.siteService.getAllSites();
      reply.send({ success: true, data: sites });
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  // Get websites by user ID
  async getSitesByUserId(req, reply) {
    const { userId } = req.params;
    try {
      const sites = await this.siteService.getSitesByUserId(userId);
      reply.send({ success: true, data: sites });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  // Register a new website
  async registerSite(req, reply) {
    console.log("Register Site Request Body:", req.body);

    try {
      const result = await this.siteService.createSite(req.body);
      console.log("Site created successfully:", result);
      reply.send({ success: true, data: result });
    } catch (error) {
      console.error("Error registering site:", error);
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Update an existing website
  async updateSite(req, reply) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedSite = await this.siteService.updateSite(id, updateData);
      reply.send({ success: true, data: updatedSite });
    } catch (error) {
      reply.status(400).send({ success: false, message: error.message });
    }
  }

  // Get a single website by its ID
  async getSite(req, reply) {
    const { id } = req.params;
    try {
      const site = await this.siteService.getSiteById(id);
      reply.send({ success: true, data: site });
    } catch (error) {
      reply.status(404).send({ success: false, message: error.message });
    }
  }

  // Delete a website
  async deleteSite(req, reply) {
    const { id } = req.params;
    try {
      const isDeleted = await this.siteService.deleteSite(id);
      if (isDeleted) {
        reply.send({ success: true, message: "Site deleted successfully" });
      } else {
        reply.status(404).send({ success: false, message: "Site not found" });
      }
    } catch (error) {
      reply.status(500).send({ success: false, message: error.message });
    }
  }

  async CalculerDetailedSite(req, reply) {
    const { url } = req.body;

    if (!url) {
      return reply.code(400).send({ message: "URL is required" });
    }

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      await page.setRequestInterception(true);

      const resources = {
        html: { count: 0, size: 0, co2: 0 },
        css: { count: 0, size: 0, co2: 0 },
        javascript: { count: 0, size: 0, co2: 0 },
        image: { count: 0, size: 0, co2: 0 },
        font: { count: 0, size: 0, co2: 0 },
        xhr: { count: 0, size: 0, co2: 0 },
        other: { count: 0, size: 0, co2: 0 },
      };

      page.on("request", (req) => req.continue());

      page.on("response", async (response) => {
        try {
          const req = response.request();
          const resourceType = req.resourceType();
          const headers = response.headers();
          const contentType = headers["content-type"] || "";
          let size = parseInt(headers["content-length"] || "0", 10);

          if (size === 0) {
            const buffer = await response.buffer().catch(() => null);
            if (buffer) size = buffer.length;
          }

          if (contentType.includes("text/html")) {
            resources.html.count++;
            resources.html.size += size;
          } else if (contentType.includes("text/css")) {
            resources.css.count++;
            resources.css.size += size;
          } else if (contentType.includes("javascript")) {
            resources.javascript.count++;
            resources.javascript.size += size;
          } else if (contentType.includes("image/")) {
            resources.image.count++;
            resources.image.size += size;
          } else if (
            contentType.includes("font/") ||
            contentType.includes("application/font")
          ) {
            resources.font.count++;
            resources.font.size += size;
          } else if (
            contentType.includes("application/json") ||
            resourceType === "xhr"
          ) {
            resources.xhr.count++;
            resources.xhr.size += size;
          } else {
            resources.other.count++;
            resources.other.size += size;
          }
        } catch (err) {
          // Safe fallback
        }
      });

      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

      const performanceMetrics = await page.evaluate(
        () => performance.getEntriesByType("navigation")[0]
      );

      const inlineCSSBytes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("style"))
          .map((el) => el.innerHTML.length)
          .reduce((a, b) => a + b, 0);
      });
      resources.css.count += 1;
      resources.css.size += inlineCSSBytes;

      // CO2 conversion constant
      const EMISSIONS_PER_MB = 0.81 * 0.475 * 1000;

      // Total size in bytes
      let totalBytes = Object.values(resources).reduce(
        (sum, res) => sum + res.size,
        0
      );

      // Calculate CO2 per resource type
      for (const key in resources) {
        const res = resources[key];
        res.co2 = (res.size / (1024 * 1024)) * EMISSIONS_PER_MB;
      }

      const totalCO2 = Object.values(resources).reduce(
        (sum, r) => sum + r.co2,
        0
      );

      // Energy in kWh
      const energyConsumption = (totalBytes / (1024 * 1024 * 1024)) * 0.475;

      const suggestions = [];

      if (resources.image.size > totalBytes * 0.4) {
        suggestions.push(
          "Images make up a large portion of your page. Consider optimizing images and using modern formats like WebP."
        );
      }
      if (resources.javascript.size > totalBytes * 0.3) {
        suggestions.push(
          "JavaScript files are significant. Consider code splitting and removing unused code."
        );
      }
      if (resources.css.size > totalBytes * 0.1) {
        suggestions.push(
          "Consider using a CSS purge tool to remove unused styles."
        );
      }
      if (resources.font.count > 2) {
        suggestions.push(
          "Multiple font files detected. Try to limit font usage or use system fonts."
        );
      }
      if (totalBytes > 3 * 1024 * 1024) {
        suggestions.push(
          "Your page is larger than 3MB. Aim to keep pages under 1MB for better performance and lower emissions."
        );
      }

      await browser.close();

      console.log(resources);

      return reply.send({
        url,
        pageWeightMB: (totalBytes / (1024 * 1024))?.toFixed(2),
        co2Grams: totalCO2?.toFixed(2),
        energyKWh: energyConsumption?.toFixed(4),
        breakdown: Object.fromEntries(
          Object.entries(resources).map(([key, res]) => [
            key,
            {
              count: res.count,
              sizeKB: (res.size / 1024)?.toFixed(2),
              co2g: res.co2?.toFixed(2),
            },
          ])
        ),
        loadTimeMs: performanceMetrics
          ? performanceMetrics.duration?.toFixed(2)
          : null,
        suggestions:
          suggestions.length > 0
            ? suggestions
            : [
                "Your website is already quite efficient!",
                "Consider using green hosting providers powered by renewable energy.",
              ],
      });
    } catch (err) {
      
      return reply.code(500).send({
        message: "Error calculating carbon emissions",
        error: err.message,
      });
    }
  }
}

module.exports = SiteController;
