import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Products'],
  endpoints: () => ({})
});

export const baseQuery = fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' });
