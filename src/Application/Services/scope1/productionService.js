const productionRepo = require('../../../Infrastructure/Repositories/scope1/productionRepo');

class ProductionService {
  constructor(productionRepo) {
    this.productionRepo = productionRepo;
  }

  async addProduction(data, companyId) {
    const { products } = data;
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error("Products array is required and must not be empty");
    }

    const product = products[0];
    const emissionFactor = 0; // Default for production
    const co2Emission = product.quantite * emissionFactor;

    const updatedProduct = {
      ...product,
      co2Emission,
      emissionFactor,
    };

    let existingRecord = await this.productionRepo.findOne({ companyId });
    if (existingRecord) {
      existingRecord.products.push(updatedProduct);
      existingRecord.totalEmissions = existingRecord.products.reduce(
        (sum, product) => sum + product.co2Emission,
        0
      );
      return await this.productionRepo.update(existingRecord._id, {
        products: existingRecord.products,
        totalEmissions: existingRecord.totalEmissions,
      });
    } else {
      const newData = {
        products: [updatedProduct],
        totalEmissions: co2Emission,
        companyId
      };
      return await this.productionRepo.create(newData);
    }
  }

  async getProductions(companyId) {
    const records = await this.productionRepo.findOne({ companyId });
    return records ? [records] : [];
  }

  async deleteProduction(productId, companyId) {
    const record = await this.productionRepo.findOne({ companyId });
    if (!record) throw new Error("Record not found");

    const productIndex = record.products.findIndex(p => p._id.toString() === productId);
    if (productIndex === -1) throw new Error("Product not found");

    record.products.splice(productIndex, 1);
    record.totalEmissions = record.products.reduce(
      (sum, product) => sum + product.co2Emission,
      0
    );

    return await this.productionRepo.update(record._id, {
      products: record.products,
      totalEmissions: record.totalEmissions,
    });
  }

  async updateProduction(productId, updatedProduct, companyId) {
    const record = await this.productionRepo.findOne({ companyId });
    if (!record) throw new Error("Record not found");

    const productIndex = record.products.findIndex(p => p._id.toString() === productId);
    if (productIndex === -1) throw new Error("Product not found");

    const emissionFactor = 0;
    const co2Emission = updatedProduct.quantite * emissionFactor;

    const newProduct = {
      ...record.products[productIndex],
      ...updatedProduct,
      co2Emission,
      emissionFactor
    };

    record.products[productIndex] = newProduct;
    record.totalEmissions = record.products.reduce(
      (sum, product) => sum + product.co2Emission,
      0
    );

    return await this.productionRepo.update(record._id, {
      products: record.products,
      totalEmissions: record.totalEmissions,
    });
  }
}

module.exports = new ProductionService(productionRepo);