// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const TestApi = createApi({
  reducerPath: 'TestApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://w-shop.onrender.com/api/user/', }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (id: number) => `/${id}`,
    }),
    getAllCart: builder.query({
      query: () => ({
        url: "cart"
      })
    }),
    addToCart: builder.mutation({
      query: (args) => ({
        url: `cart/${args?.id}`,
        body: args.payload,
        method: 'POST',
      }),
    }),
    CreateUser: builder.mutation({
      query: (args) => ({
        url: "signup",
        body: args,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }),
    getProducts: builder.query({
      query: () => ({
        url: 'products',
      })
    }),
    getProductById: builder.query({
      query: (id: any) => ({
        url: `/product/${id}`,
      })
    }),
    createProduct: builder.mutation({
      query: (args) => ({
        url: `/product`,
        body: args,
        method: 'POST'
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetAllCartQuery, useCreateUserMutation, useGetProductsQuery, useGetProductByIdQuery, useAddToCartMutation } = TestApi;