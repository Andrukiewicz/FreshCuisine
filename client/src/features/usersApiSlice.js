import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/api/users/allusers",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ]
        } else return [{ type: "User", id: "LIST" }]
      },
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/register",
        method: "POST",
        body: {
          ...user,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUser) => ({
        url: "/api/users/updateprofile",
        method: "PATCH",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    getUserById: builder.mutation({
      query: ({ id }) => ({
        url: "/api/users/getuser",
        method: "POST",
        body: {
          ...id,
        },
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserByIdMutation,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getAllUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the user slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
