import { Product, ProductsPayloadType } from '../../../Types/Products';
import { GenericResponse } from '../../../Types/Responses';
import { LoginPayload } from '../../../interfaces/Payload';
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const CoreApi = createApi({
  reducerPath: 'CoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_MY_ENVIRONMENT === 'prod'
        ? process.env.REACT_APP_PROD_BASE_URL
        : process.env.REACT_APP_DEV_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        'authorization',
        `bearer ${String(localStorage.getItem('token'))}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (id: number) => `/${id}`,
    }),
    getAllCart: builder.query({
      query: (id: any) => ({
        url: `cart/${id}`,
      }),
    }),
    // getCurrentUser: builder.query({
    //   query: (args: string) => ({
    //     url: `user/${args}`,
    //   }),
    // }),
    addToCart: builder.mutation({
      query: (args) => ({
        url: `cart/${args?.id}`,
        body: args.payload,
        method: 'POST',
      }),
    }),
    removeCartItem: builder.mutation({
      query: (id: number) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
    }),
    CreateUser: builder.mutation({
      query: (args) => ({
        url: 'register',
        body: args,
        method: 'POST',
        redirect: 'follow',
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/me',
      }),
    }),
    LoginUser: builder.mutation<LoginPayload, any>({
      query: (args) => ({
        url: 'login',
        body: args,
        method: 'POST',
        // redirect: 'follow'
      }),
    }),
    addBillingDetails: builder.mutation({
      query: (args) => ({
        url: `/billing_info/${args.id}`,
        body: args.payload,
        method: 'POST',
      }),
    }),
    getBillingDetails: builder.query({
      query: (args) => ({
        url: `/billing_info/${args}`,
      }),
    }),
    getProducts: builder.query<ProductsPayloadType, string>({
      query: (query) => ({
        url: `products${query}`,
      }),
    }),
    getOrderById: builder.query<any, string>({
      query: (query: number | string) => ({
        url: `order/${query}`,
      }),
    }),
    getProductById: builder.query<GenericResponse<Product>, string>({
      query: (id: any) => ({
        url: `/product/${id}`,
      }),
    }),
    createProduct: builder.mutation({
      query: (args) => ({
        url: `/admin/product/new`,
        body: args,
        method: 'POST',
      }),
    }),
    paymentProcess: builder.mutation<any, any>({
      query: (args) => ({
        url: `/payment/process`,
        body: args,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_STRIPE_API_KEY}`,
        },
        params: args,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useGetCurrentUserQuery,
  useGetAllCartQuery,
  useCreateUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useLoginUserMutation,
  useCreateProductMutation,
  useLogoutMutation,
  useAddBillingDetailsMutation,
  useGetBillingDetailsQuery,
  usePaymentProcessMutation,
} = CoreApi;
