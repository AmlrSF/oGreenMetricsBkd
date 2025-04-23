// Application/Services/websiteCalcService.js
class WebsiteCalcService {
  async calculateCarbonImpact(websiteUrl) {
    try {
      const response = await fetch(
        `https://api.websitecarbon.com/site?url=${encodeURIComponent(
          websiteUrl
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch carbon data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch carbon data: " + error.message);
    }
  }
}

module.exports = new WebsiteCalcService();
