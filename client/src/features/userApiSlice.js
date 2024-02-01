import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOneUser: builder.query({
      query: ({ id }) => ({
        url: "/api/users/getuser",
        method: "POST",
        body: {
          ...id,
        },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "UserId", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UserId", id })),
          ]
        } else return [{ type: "UserId", id: "LIST" }]
      },
    }),
  }),
})

export const { useGetOneUserQuery } = userApiSlice

export const selectUserResult = userApiSlice.endpoints.getOneUser.select()

const selectUserData = createSelector(
  selectUserResult,
  (userResult) => userResult.data
)

export const {
  selectOne: selectOneUser,
  // Pass in a selector that returns the user slice of state
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialState)
