import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


export type Ingredient = {
  name: string, count: number, unit: string | null
}

interface PantryState {
  ingredients: Ingredient[],
}

const initialState: PantryState = {
  ingredients: [],
}

export const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    updatePantry: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload
    }
  }
})

export const { updatePantry } = pantrySlice.actions

export const selectPantry = (state: RootState) => state.pantry.ingredients
export default pantrySlice.reducer