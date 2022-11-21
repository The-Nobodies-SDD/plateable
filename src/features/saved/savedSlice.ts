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
}

const initialState: Saved = {
  saved: [],
}

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    updateSaved: (state, action: PayloadAction<SavedItem[]>) => {
      state.saved = action.payload
    }
  }
})

export const { updateSaved } = savedSlice.actions

export const selectSaved = (state: RootState) => state.saved.saved
export default savedSlice.reducer