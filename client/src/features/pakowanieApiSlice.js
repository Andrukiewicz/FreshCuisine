import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const pakowanieAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a._id
      .toLowerCase()
      .localeCompare(b._id.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = pakowanieAdapter.getInitialState()

export const pakowanieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPakowanie: builder.query({
      query: () => "/api/orders/pakowanie",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedPakowanie = responseData.map((pakowanie) => {
          pakowanie.id = pakowanie._id
          return pakowanie
        })
        return pakowanieAdapter.setAll(initialState, loadedPakowanie)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Pakowanie", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Pakowanie", id })),
          ]
        } else return [{ type: "Pakowanie", id: "LIST" }]
      },
    }),
  }),
})

export const { useGetAllPakowanieQuery } = pakowanieApiSlice

export const selectPakowanieResult =
  pakowanieApiSlice.endpoints.getAllPakowanie.select()

const selectPakowanieData = createSelector(
  selectPakowanieResult,
  (pakowanieResult) => pakowanieResult.data
)

export const {
  selectAll: selectAllPakowanie,
  selectById: selectPakowanieById,
  selectIds: selectPakowanieIds,
  // Pass in a selector that returns the pakowanie slice of state
} = pakowanieAdapter.getSelectors(
  (state) => selectPakowanieData(state) ?? initialState
)
