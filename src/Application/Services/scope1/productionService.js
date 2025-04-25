const productionRepo = require('../../../Infrastructure/Repositories/scope1/productionRepo');
const CompanyRepo = require('../../../Infrastructure/Repositories/companyRepo');

class ProductionService {
  constructor(productionRepo) {
    this.productionRepo = productionRepo;
    this.companyRepo = new CompanyRepo();
  }

  async addProduction(data, companyId) {
    const { products } = data;
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error("Products array is required and must not be empty");
    }

    // Validate that each product has ligneDeProduction
    products.forEach(product => {
      if (!product.ligneDeProduction) {
        throw new Error("ligneDeProduction is required for each product");
      }
    });

    const company = await this.companyRepo.getCompanyById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    const emissionFactor = company.emissions;

    const updatedProducts = products.map(product => ({
      ...product,
      co2Emission: product.quantite * emissionFactor,
    }));

    let existingRecord = await this.productionRepo.findOne({ companyId });
    if (existingRecord) {
      existingRecord.products.push(...updatedProducts);
      existingRecord.totalEmissions = existingRecord.products.reduce(
        (sum, product) => sum + product.co2Emission,
        0
      );
      existingRecord.emissionFactor = emissionFactor;
      return await this.productionRepo.update(existingRecord._id, {
        products: existingRecord.products,
        totalEmissions: existingRecord.totalEmissions,
        emissionFactor: existingRecord.emissionFactor,
      });
    } else {
      const totalEmissions = updatedProducts.reduce(
        (sum, product) => sum + product.co2Emission,
        0
      );
      const newData = {
        products: updatedProducts,
        totalEmissions,
        emissionFactor,
        companyId,
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

    if (!updatedProduct.ligneDeProduction) {
      throw new Error("ligneDeProduction is required");
    }

    const company = await this.companyRepo.getCompanyById(companyId);
    if (!company) throw new Error("Company not found");
    const emissionFactor = company.emissions;

    const newProduct = {
      ...record.products[productIndex],
      ...updatedProduct,
      co2Emission: updatedProduct.quantite * emissionFactor,
    };

    record.products[productIndex] = newProduct;
    record.totalEmissions = record.products.reduce(
      (sum, product) => sum + product.co2Emission,
      0
    );
    record.emissionFactor = emissionFactor;

    return await this.productionRepo.update(record._id, {
      products: record.products,
      totalEmissions: record.totalEmissions,
      emissionFactor: record.emissionFactor,
    });
  }
}

module.exports = new ProductionService(productionRepo);