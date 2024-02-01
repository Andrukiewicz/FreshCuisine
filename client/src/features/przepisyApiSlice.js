import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const przepisyAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" }),
})

const initialState = przepisyAdapter.getInitialState()

export const przepisyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPrzepisy: builder.query({
      query: () => "/api/products/getallprzepisy",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedPrzepisy = responseData.map((przepisy) => {
          przepisy.id = przepisy._id
          return przepisy
        })
        return przepisyAdapter.setAll(initialState, loadedPrzepisy)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Przepisy", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Przepisy", id })),
          ]
        } else return [{ type: "Przepisy", id: "LIST" }]
      },
    }),
    addPrzepisy: builder.mutation({
      query: (przepisy) => ({
        url: "/api/products/addprzepisy",
        method: "POST",
        body: przepisy,
      }),
      invalidatesTags: [{ type: "Przepisy", id: "LIST" }],
    }),
    editPrzepisy: builder.mutation({
      query: (editedprzepisy) => ({
        url: "/api/products/editprzepisy",
        method: "PATCH",
        body: editedprzepisy,
      }),
      invalidateTags: (result, error, arg) => [
        { type: "Przepisy", id: arg.id },
      ],
    }),
    getPrzepisyById: builder.mutation({
      query: ({ przepisyid }) => ({
        url: "/api/products/getprzepisybyid",
        method: "POST",
        body: {
          ...przepisyid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Przepisy", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetAllPrzepisyQuery,
  useAddPrzepisyMutation,
  useEditPrzepisyMutation,
  useGetPrzepisyByIdMutation,
} = przepisyApiSlice

export const selectPrzepisyResult =
  przepisyApiSlice.endpoints.getAllPrzepisy.select()

const selectPrzepisyData = createSelector(
  selectPrzepisyResult,
  (przepisyResult) => przepisyResult.data
)

export const {
  selectAll: selectAllPrzepisy,
  selectById: selectPrzepisyById,
  selectIds: selectPrzepisyIds,
  // Pass in a selector that returns the przepisy slice of state
} = przepisyAdapter.getSelectors(
  (state) => selectPrzepisyData(state) ?? initialState
)
