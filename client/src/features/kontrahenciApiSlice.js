import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const kontrahenciAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.shortName
      .toLowerCase()
      .localeCompare(b.shortName.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = kontrahenciAdapter.getInitialState()

export const kontrahenciApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllKontrahenci: builder.query({
      query: () => "/api/products/getallkontrahenci",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedKontrahenci = responseData.map((kontrahenci) => {
          kontrahenci.id = kontrahenci._id
          return kontrahenci
        })
        return kontrahenciAdapter.setAll(initialState, loadedKontrahenci)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Kontrahenci", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Kontrahenci", id })),
          ]
        } else return [{ type: "Kontrahenci", id: "LIST" }]
      },
    }),
    addKontrahenci: builder.mutation({
      query: (kontrahenci) => ({
        url: "/api/products/addkontrahenci",
        method: "POST",
        body: kontrahenci,
      }),
      invalidatesTags: [{ type: "Kontrahenci", id: "LIST" }],
    }),
    editKontrahenci: builder.mutation({
      query: (editedkontrahenci) => ({
        url: "/api/products/editkontrahenci",
        method: "PATCH",
        body: editedkontrahenci,
      }),
      invalidateTags: (result, error, arg) => [
        { type: "Kontrahenci", id: arg.id },
      ],
    }),
    getKontrahenciById: builder.mutation({
      query: ({ kontrahenciid }) => ({
        url: "/api/products/getkontrahencibyid",
        method: "POST",
        body: {
          ...kontrahenciid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Kontrahenci", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetAllKontrahenciQuery,
  useAddKontrahenciMutation,
  useEditKontrahenciMutation,
  useGetKontrahenciByIdMutation,
} = kontrahenciApiSlice

export const selectKontrahenciResult =
  kontrahenciApiSlice.endpoints.getAllKontrahenci.select()

const selectKontrahenciData = createSelector(
  selectKontrahenciResult,
  (kontrahenciResult) => kontrahenciResult.data
)

export const {
  selectAll: selectAllKontrahenci,
  selectById: selectKontrahenciById,
  selectIds: selectKontrahenciIds,
  // Pass in a selector that returns the kontrahenci slice of state
} = kontrahenciAdapter.getSelectors(
  (state) => selectKontrahenciData(state) ?? initialState
)
