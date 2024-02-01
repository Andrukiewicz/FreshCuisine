import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const skladnikiAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = skladnikiAdapter.getInitialState()

export const skladnikiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkladniki: builder.query({
      query: () => "/api/products/getallskladniki",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedSkladniki = responseData.map((skladniki) => {
          skladniki.id = skladniki._id
          return skladniki
        })
        return skladnikiAdapter.setAll(initialState, loadedSkladniki)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Skladniki", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Skladniki", id })),
            { type: "Skladniki", id: "LIST" },
          ]
        } else return [{ type: "Skladniki", id: "LIST" }]
      },
    }),
    addSkladniki: builder.mutation({
      query: (skladniki) => ({
        url: "/api/products/addskladniki",
        method: "POST",
        body: skladniki,
      }),
      invalidatesTags: [{ type: "Skladniki", id: "LIST" }],
    }),
    editSkladniki: builder.mutation({
      query: (editedskladniki) => ({
        url: "/api/products/editskladniki",
        method: "PATCH",
        body: editedskladniki,
      }),
      invalidateTags: (result, error, arg) => [{ type: "Skladniki", id: arg }],
    }),
    getSkladnikiById: builder.mutation({
      query: ({ skladnikiid }) => ({
        url: "/api/products/getskladnikibyid",
        method: "POST",
        body: {
          ...skladnikiid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Skladniki", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetAllSkladnikiQuery,
  useAddSkladnikiMutation,
  useEditSkladnikiMutation,
  useGetSkladnikiByIdMutation,
} = skladnikiApiSlice

export const selectSkladnikiResult =
  skladnikiApiSlice.endpoints.getAllSkladniki.select()

const selectSkladnikiData = createSelector(
  selectSkladnikiResult,
  (skladnikiResult) => skladnikiResult.data
)

export const {
  selectAll: selectAllSkladniki,
  selectById: selectSkladnikiById,
  selectIds: selectSkladnikiIds,
  // Pass in a selector that returns the skladniki slice of state
} = skladnikiAdapter.getSelectors(
  (state) => selectSkladnikiData(state) ?? initialState
)
