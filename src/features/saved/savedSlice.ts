import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export type SavedIngredient = {
  id:string,
  aisle:string,
  image:string,
  name:string,
  amount:number,
  unit:string,
  unitShort:string,
  unitLong:string,
  originalString: string
}

export type SavedItem = {
  info: {
    id: string,
    sourceUrl: string,
    ingredients: SavedIngredient[],
    title: string,
    image: string,
    time: string,
    instructions: string
  }
}

interface Saved {
  saved: SavedItem[],
  hasPulled: boolean
}

const initialState: Saved = {
  saved: [],
  hasPulled: false
}

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    updateSaved: (state, action: PayloadAction<SavedItem[]>) => {
      state.saved = action.payload
    },
    updateHasPulled: (state, action: PayloadAction<boolean>) => {
      state.hasPulled = action.payload
    }
  }
})

export const { updateSaved, updateHasPulled } = savedSlice.actions

export const selectSaved = (state: RootState) => state.saved.saved
export const selectHasPulled = (state: RootState) => state.saved.hasPulled

export default savedSlice.reducer