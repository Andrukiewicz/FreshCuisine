import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/api/products/getallproducts",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          product.id = product._id
          return product
        })
        return productsAdapter.setAll(initialState, loadedProducts)
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
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products/addproduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    editProduct: builder.mutation({
      query: (editedproduct) => ({
        url: "/api/products/editproduct",
        method: "PATCH",
        body: editedproduct,
      }),
      invalidateTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
    getProductById: builder.mutation({
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

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdMutation,
} = productsApiSlice

export const selectProductsResult =
  productsApiSlice.endpoints.getAllProducts.select()

const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
)

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  // Pass in a selector that returns the product slice of state
} = productsAdapter.getSelectors(
  (state) => selectProductsData(state) ?? initialState
)
