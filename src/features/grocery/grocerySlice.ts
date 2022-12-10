import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Ingredient } from '../../containers/List';

interface GroceryState {
  ingredients: Ingredient[],
  hasPulled: boolean
}

const initialState: GroceryState = {
  ingredients: [],
  hasPulled: false
}

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    updateGrocery: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    },
    updateGroceryPulled: (state, action: PayloadAction<boolean>) => {
      state.hasPulled = action.payload
    }
  }
})

export const { updateGrocery, updateGroceryPulled } = grocerySlice.actions

export const selectGrocery = (state: RootState) => state.grocery.ingredients
export const selectGroceryPulled = (state: RootState) => state.grocery.hasPulled
export default grocerySlice.reducer