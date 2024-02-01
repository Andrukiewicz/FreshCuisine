import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const kalkulatorAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a._id
      .toLowerCase()
      .localeCompare(b._id.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = kalkulatorAdapter.getInitialState()

export const kalkulatorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllKalkulator: builder.query({
      query: () => "/api/orders/kalkulator-towaru",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedKalkulator = responseData.map((kalkulator) => {
          kalkulator.id = kalkulator.uniqueIds
          return kalkulator
        })
        return kalkulatorAdapter.setAll(initialState, loadedKalkulator)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Kalkulator", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Kalkulator", id })),
          ]
        } else return [{ type: "Kalkulator", id: "LIST" }]
      },
    }),
  }),
})

export const { useGetAllKalkulatorQuery } = kalkulatorApiSlice

export const selectKalkulatorResult =
  kalkulatorApiSlice.endpoints.getAllKalkulator.select()

const selectKalkulatorData = createSelector(
  selectKalkulatorResult,
  (kalkulatorResult) => kalkulatorResult.data
)

export const {
  selectAll: selectAllKalkulator,
  selectById: selectKalkulatorById,
  selectIds: selectKalkulatorIds,
  // Pass in a selector that returns the kalkulator slice of state
} = kalkulatorAdapter.getSelectors(
  (state) => selectKalkulatorData(state) ?? initialState
)
