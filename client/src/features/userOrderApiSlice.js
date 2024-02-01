import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const userOrderAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.toString().localeCompare(b.createdAt),
})

const initialState = userOrderAdapter.getInitialState()

export const userOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrder: builder.query({
      query: ({ id }) => ({
        url: "/api/orders/getuserorders",
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
            { type: "UserOrder", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UserOrder", id })),
          ]
        } else return [{ type: "UserOrder", id: "LIST" }]
      },
    }),
  }),
})

export const { useGetUserOrderQuery } = userOrderApiSlice

export const selectUserOrderResult =
  userOrderApiSlice.endpoints.getUserOrder.select()

const selectUserOrderData = createSelector(
  selectUserOrderResult,
  (userOrderResult) => userOrderResult.data
)

export const {
  selectOne: selectUserOrder,
  // Pass in a selector that returns the userOrder slice of state
} = userOrderAdapter.getSelectors(
  (state) => selectUserOrderData(state) ?? initialState
)
