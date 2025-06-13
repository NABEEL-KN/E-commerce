import { apiSlice } from './apiSlice';

export const productApi = apiSlice.injectEndpoints({
  reducerPath: 'productApi',
  baseQuery: apiSlice.baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 24, category = 'all', searchQuery = '', sortBy = 'price_asc' }) => ({
        url: '/products',
        params: {
          limit,
          ...(category !== 'all' && { category }),
          ...(searchQuery && { title: searchQuery }),
          ...(sortBy && {
            sort: sortBy.split('_')[0],
            order: sortBy.split('_')[1]
          })
        }
      }),
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
