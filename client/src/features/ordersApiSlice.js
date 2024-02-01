import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const ordersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.toString().localeCompare(b.createdAt),
})

const initialState = ordersAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/api/orders/getallorders",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedOrders = responseData.map((order) => {
          order.id = order._id
          return order
        })
        return ordersAdapter.setAll(initialState, loadedOrders)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Order", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Order", id })),
          ]
        } else return [{ type: "Order", id: "LIST" }]
      },
    }),
    deliverOrder: builder.mutation({
      query: ({ orderid }) => ({
        url: "/api/orders/deliverorder",
        method: "POST",
        body: {
          ...orderid,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
    getOrdersById: builder.mutation({
      query: ({ email }) => ({
        url: "/api/orders/getorderbyid",
        method: "POST",
        body: {
          ...email,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
  }),
})

export const {
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useGetOrdersByIdMutation,
} = ordersApiSlice

export const selectOrdersResult = ordersApiSlice.endpoints.getAllOrders.select()

const selectOrdersData = createSelector(
  selectOrdersResult,
  (ordersResult) => ordersResult.data
)

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  // Pass in a selector that returns the order slice of state
} = ordersAdapter.getSelectors(
  (state) => selectOrdersData(state) ?? initialState
)
