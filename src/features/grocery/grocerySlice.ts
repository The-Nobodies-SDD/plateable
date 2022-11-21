import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Ingredient } from '../../containers/List';

interface GroceryState {
  ingredients: Ingredient[],
}

const initialState: GroceryState = {
  ingredients: [],
}

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    updateGrocery: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    }
  }
})

export const { updateGrocery } = grocerySlice.actions

export const selectGrocery = (state: RootState) => state.grocery.ingredients
export default grocerySlice.reducer