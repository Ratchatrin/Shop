import { createSlice } from "@reduxjs/toolkit";

// export const getData = createAsyncThunk("getData", async (userCredentials) => {
//   try {
//     const request = await axios.post(
//       "http://localhost:3001/login",
//       userCredentials
//     );
//     const response = await request.data;
//     localStorage.setItem("user", JSON.stringify(response));
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// });
const slicer = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload;
    },
    userAddCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.userData.cart.findIndex(
        (item) =>
          item.color === newItem.color &&
          item.size === newItem.size &&
          item.id === newItem.id
      );
      if (existingItemIndex !== -1) {
        state.userData.cart[existingItemIndex].amount += 1;
      } else {
        state.userData.cart = [...state.userData.cart, newItem];
      }
    },
    userDelete: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.userData.cart.findIndex(
        (item) =>
          item.color === newItem.color &&
          item.size === newItem.size &&
          item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.userData.cart[existingItemIndex].amount -= 1;
        if (state.userData.cart[existingItemIndex].amount <= 0) {
          state.userData.cart.splice(existingItemIndex, 1);
        }
      } else {
        state.userData.cart.push(newItem);
      }
    },
    userLogout: (state) => {
      state.userData = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getData.pending, (state, action) => {
  //       state.loading = true;
  //     })
  //     .addCase(getData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.userData = action.payload;
  //     })
  //     .addCase(getData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = true;
  //     });
  // },
});
export const { userAddCart, updateCart, loginUser, userLogout, userDelete } =
  slicer.actions;
export default slicer.reducer;
