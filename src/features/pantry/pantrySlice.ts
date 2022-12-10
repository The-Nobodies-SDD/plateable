import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


export type PantryIngredient = {
  name: string, count: number, unit: string | null
}

interface PantryState {
  ingredients: PantryIngredient[],
  hasPulled: boolean
}

const initialState: PantryState = {
  ingredients: [],
  hasPulled: false
}

export const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    updatePantry: (state, action: PayloadAction<PantryIngredient[]>) => {
      state.ingredients = action.payload
    },
    updatePantryPulled: (state, action: PayloadAction<boolean>) => {
      state.hasPulled = action.payload
    }
  }
})

export const { updatePantry, updatePantryPulled } = pantrySlice.actions

export const selectPantry = (state: RootState) => state.pantry.ingredients
export const selectPantryPulled = (state: RootState) => state.pantry.hasPulled

export default pantrySlice.reducer