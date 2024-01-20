import Brand from "../models/brand.model";
import { IBrand } from "../interfaces/brand.interface";

/**
 * Service class for managing brands.
 */
export class BrandService {
  /**
   * *Adds a new brand to the database.
   * @param {IBrand} data - The data object containing the brand information.
   * @param {string} [language] - The language of the brand.
   * @returns {Promise<Brand>} A promise that resolves to the newly created brand object.
   */
  async addBrand(data: IBrand, language?: string) {
    // Create a new brand using the Brand model
    const brand = new Brand(data);
    // Save the brand to the database
    return brand.save();
  }

  /**
   * *Retrieves a brand from the database based on its name.
   * @param {string} name - The name of the brand to retrieve.
   * @returns {Promise<Brand>} A promise that resolves to the retrieved brand object.
   * @throws {Error} If the brand is not found in the database.
   */
  async getBrand(name: string) {
    // Find the brand in the database
    const brand = await Brand.findOne({ name: name }).exec();
    // Throw an error if the brand is not found
    if (!brand) {
      throw { message: "Brand not found" };
    }
    // Return the brand
    return brand;
  }

  /**
   * *Updates the data of a brand with the specified brand ID.
   * @param {string} brandId - The ID of the brand to update.
   * @param {Object} updatedBrandData - The updated data for the brand.
   * @param {boolean} updatedBrandData.isPopular - The updated popularity status of the brand.
   * @throws {Error} - Throws an error indicating that the method is not implemented.
   * @returns None
   */
  updateBrand(brandId: string, updatedBrandData: { isPopular: boolean }) {
    //Todo: Implement this method for updating the brand details
    throw new Error("Method not implemented.");
  }

  /**
   ** Deletes a brand from the database based on the provided brand ID.
   * @param {string} brandId - The ID of the brand to delete.
   * @returns {Promise} A promise that resolves to the deleted brand object.
   */
  async deleteBrand(brandId: string) {
    // Delete the brand from the databse
    return await Brand.findByIdAndRemove({ _id: brandId }).exec();
  }

  /**
   * *Update the image details of a brand document in the database.
   * @param {string} brandId - The ID of the brand document to update.
   * @param {any} image - The image details.
   * @returns {Promise<any>} - A promise that resolves to the updated brand document.
   */
  async uploadImage(brandId: string, image: any) {
    // Update the brand logo in the database
    return await Brand.findByIdAndUpdate(brandId, { logo: image }).exec();
  }

  /**
   * *Updates the video details of a brand document in the database.
   * @param {string} brandId - The ID of the brand to upload the video to.
   * @param {any} video - The video details.
   * @returns {Promise<any>} - A promise that resolves to the updated brand object.
   */
  async uploadVideo(brandId: string, video: any) {
    // Update the brand video in the database
    return await Brand.findByIdAndUpdate(brandId, { video: video }).exec();
  }

  /**
   * *Marks a brand as popular by updating the "isPopular" field in the database.
   * @param {string} brandId - The ID of the brand to mark as popular.
   * @returns {Promise<any | null>} - A promise that resolves to the updated brand object, or null if the brand was not found.
   * @throws {Error} - If there was an error updating the brand.
   */
  async markBrandAsPopular(brandId: string): Promise<any | null> {
    try {
      // Update the "isPopular" field in the database
      const updatedBrand = await Brand.findByIdAndUpdate(brandId, { isPopular: true }, { new: true }).exec();
      // Return the updated brand
      return updatedBrand;
    } catch (error) {
      // Throw an error if there was an error updating the brand
      throw new Error(error.message);
    }
  }

  /**
   * *Retrieves all the brands that are marked as popular from the database.
   * @returns {Promise<any[]>} - A promise that resolves to an array of popular brands.
   * @throws {Error} - If an error occurs while fetching the brands.
   */
  static async getAllMarkedPopularBrands(): Promise<any[]> {
    try {
      // Retrieve all the brands that are marked as popular
      const allMarkedPopularBrands = await Brand.find({ isPopular: true }).exec();
      // Return the array of popular brands
      return allMarkedPopularBrands;
    } catch (error) {
      // Throw an error if an error occurs while fetching the brands
      throw new Error("An error occurred while fetching all marked popular brands.");
    }
  }
}
