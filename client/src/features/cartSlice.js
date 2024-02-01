// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalCount: 0,
    deliveryInfo: null,
  },
  reducers: {
    getCartTotal: (state) => {
      let { totalAmount, totalCount } = state.cartItems.reduce(
        (cartTotal, cartItems) => {
          const { priceTotal, quantity } = cartItems
          const itemTotal = priceTotal * quantity
          cartTotal.totalAmount += itemTotal
          cartTotal.totalCount += quantity
          return cartTotal
        },
        { totalAmount: 0, totalCount: 0 }
      )
      // state.totalAmount = parseInt(totalAmount.toFixed(2))
      state.totalAmount = parseFloat(totalAmount.toFixed(2))
      state.totalCount = totalCount
    },
    addToCart: (state, action) => {
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      )
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload)
      item.quantity++
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload)
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    deleteFromCart: (state, action) => {
      //   const deleteFromCart = state.cartItems.filter(
      //     (item) => item.id !== action.payload
      //   )
      //   state.cartItems = deleteFromCart
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
    },
    clearCart: (state, action) => {
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalCount: 0,
        deliveryInfo: null,
      }
    },
    getCartItems: (state) => {
      return {
        cartItems: [...state.cartItems],
      }
    },
    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload
    },
  },
})

export const {
  getCartTotal,
  clearCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  getCartItems,
  setDeliveryInfo,
} = cartSlice.actions

export default cartSlice.reducer
