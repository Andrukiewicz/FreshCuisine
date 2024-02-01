import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const producenciAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = producenciAdapter.getInitialState()

export const producenciApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducenci: builder.query({
      query: () => "/api/products/getallproducenci",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedProducenci = responseData.map((producenci) => {
          producenci.id = producenci._id
          return producenci
        })
        return producenciAdapter.setAll(initialState, loadedProducenci)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Producenci", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Producenci", id })),
          ]
        } else return [{ type: "Producenci", id: "LIST" }]
      },
    }),
    addProducenci: builder.mutation({
      query: (producenci) => ({
        url: "/api/products/addproducenci",
        method: "POST",
        body: producenci,
      }),
      invalidatesTags: [{ type: "Producenci", id: "LIST" }],
    }),
    editProducenci: builder.mutation({
      query: (editedproducenci) => ({
        url: "/api/products/editproducenci",
        method: "PATCH",
        body: editedproducenci,
      }),
      invalidateTags: (result, error, arg) => [
        { type: "Producenci", id: arg.id },
      ],
    }),
    getProducenciById: builder.mutation({
      query: ({ producenciid }) => ({
        url: "/api/products/getproducencibyid",
        method: "POST",
        body: {
          ...producenciid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Producenci", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetAllProducenciQuery,
  useAddProducenciMutation,
  useEditProducenciMutation,
  useGetProducenciByIdMutation,
} = producenciApiSlice

export const selectProducenciResult =
  producenciApiSlice.endpoints.getAllProducenci.select()

const selectProducenciData = createSelector(
  selectProducenciResult,
  (producenciResult) => producenciResult.data
)

export const {
  selectAll: selectAllProducenci,
  selectById: selectProducenciById,
  selectIds: selectProducenciIds,
  // Pass in a selector that returns the producenci slice of state
} = producenciAdapter.getSelectors(
  (state) => selectProducenciData(state) ?? initialState
)
