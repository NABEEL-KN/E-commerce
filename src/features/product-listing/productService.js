import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const productService = {
  getAllProducts: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
          limit: limit,
          skip: (page - 1) * limit
        }
      });
      // For Fake Store API, we'll assume total products is 20
      return {
        products: response.data,
        total: 20
      };
    } catch (error) {
      throw error;
    }
  },

  getProductsByCategory: async (category, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`, {
        params: {
          limit: limit,
          skip: (page - 1) * limit
        }
      });
      // For Fake Store API, we'll assume total products is 20
      return {
        products: response.data,
        total: 20
      };
    } catch (error) {
      throw error;
    }
  },

  searchProducts: async (query, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
          title: query,
          limit: limit,
          skip: (page - 1) * limit
        }
      });
      // For Fake Store API, we'll assume total products is 20
      return {
        products: response.data,
        total: 20
      };
    } catch (error) {
      throw error;
    }
  }
};
