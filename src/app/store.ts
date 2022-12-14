import { configureStore } from '@reduxjs/toolkit'
import groceryReducer from '../features/grocery/grocerySlice';
import pantryReducer from '../features/pantry/pantrySlice';
import savedReducer from '../features/saved/savedSlice';

const store = configureStore({
  reducer: {
    grocery: groceryReducer,
    pantry: pantryReducer,
    saved: savedReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store