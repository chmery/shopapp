import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SliceState = {
    favouriteItems: FavouriteItem[];
};

const initialState: SliceState = { favouriteItems: [] };

const favouritesSlice = createSlice({
    name: "cartData",
    initialState,
    reducers: {
        addToFavourites(state, action: PayloadAction<FavouriteItem>) {
            state.favouriteItems.push(action.payload);
        },
        removeFromFavourites(state, action: PayloadAction<FavouriteItem>) {
            state.favouriteItems.filter((item) => item.id !== action.payload.id);
        },
        setInitialFavouritesData(state, action: PayloadAction<FavouriteItem[]>) {
            state.favouriteItems = action.payload;
        },
        clearFavouritesData(state) {
            state.favouriteItems = [];
        },
    },
});

export const favouritesActions = favouritesSlice.actions;
const favouritesReducer = favouritesSlice.reducer;
export default favouritesReducer;
