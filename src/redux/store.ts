import { configureStore, Action } from '@reduxjs/toolkit';
import diarySlice from './diarySlice';

const store = configureStore({
  reducer: {
    diaryReducer: diarySlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
