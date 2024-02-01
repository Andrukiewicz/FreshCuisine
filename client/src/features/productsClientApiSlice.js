import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const productsClientAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = productsClientAdapter.getInitialState()

export const productsClientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsClient: builder.query({
      query: () => "/api/products/getproductsclient",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          product.id = product._id
          return product
        })
        return productsClientAdapter.setAll(initialState, loadedProducts)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ]
        } else return [{ type: "Product", id: "LIST" }]
      },
    }),
    getProductClientById: builder.mutation({
      query: ({ productid }) => ({
        url: "/api/products/getproductbyid",
        method: "POST",
        body: {
          ...productid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
})

export const { useGetProductsClientQuery, useGetProductClientByIdMutation } =
  productsClientApiSlice

export const selectProductsClientResult =
  productsClientApiSlice.endpoints.getProductsClient.select()

const selectProductsClientData = createSelector(
  selectProductsClientResult,
  (productsClientResult) => productsClientResult.data
)

export const {
  selectAll: selectProductsClient,
  selectById: selectProductClientById,
  // Pass in a selector that returns the product slice of state
} = productsClientAdapter.getSelectors(
  (state) => selectProductsClientData(state) ?? initialState
)
