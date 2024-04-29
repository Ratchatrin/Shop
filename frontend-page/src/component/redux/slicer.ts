import { createSlice } from "@reduxjs/toolkit";
interface UserData {
  _id: string;
  cart: CartItem[]; 

}
interface CartItem {
  id: string;
  brand: string;
  productname: string;
  description: string;
  color: string;
  size: string;
  overview: string[];
  materials: {
    FABRICDETAILS: string;
  };
  price: number;
  amount: number;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null as UserData | null, 
    loading: false,
    error: false,
  },
  reducers: {
    loginUser: (state, action: { payload: UserData }) => { 
      state.userData = action.payload;
    },
    userAddCart: (state, action: { payload: CartItem }) => {
      const newItem = action.payload;
      const existingItemIndex = state.userData!.cart.findIndex( 
        (item: CartItem) =>
          item.color === newItem.color &&
          item.size === newItem.size &&
          item.id === newItem.id
      );
      if (existingItemIndex !== -1) {
        state.userData!.cart[existingItemIndex].amount += 1;
      } else {
        state.userData!.cart = [...state.userData!.cart, newItem];
      }
    },
    userDelete: (state, action: { payload: CartItem }) => { 
      const newItem = action.payload;
      const existingItemIndex = state.userData!.cart.findIndex( 
        (item: CartItem) =>
          item.color === newItem.color &&
          item.size === newItem.size &&
          item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.userData!.cart[existingItemIndex].amount -= 1;
        if (state.userData!.cart[existingItemIndex].amount <= 0) {
          state.userData!.cart.splice(existingItemIndex, 1);
        }
      } 
    },
    userLogout: (state) => {
      state.userData = null;
    },
  },
});

export const { userAddCart, loginUser, userLogout, userDelete } = userSlice.actions;
export default userSlice.reducer;
