import { apiSlice } from './apiSlice';

export const productApi = apiSlice.injectEndpoints({
  reducerPath: 'productApi',
  baseQuery: apiSlice.baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args = {}) => {
        const { 
          limit = 24, 
          category = 'all', 
          searchQuery = '', 
          sortBy = 'price_asc' 
        } = args;
        
        const params = {
          limit,
          ...(category && category !== 'all' && { category }),
          ...(searchQuery && { title: searchQuery })
        };
        
        if (sortBy) {
          const [sort, order] = sortBy.split('_');
          if (sort && order) {
            params.sort = sort;
            params.order = order;
          }
        }
        
        return {
          url: '/products',
          params
        };
      },
      transformResponse: (response) => response,
      providesTags: ['Products']
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query({
      query: () => '/products/categories',
      providesTags: ['Categories'],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productApi;
