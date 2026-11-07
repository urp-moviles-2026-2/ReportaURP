import { configureStore } from '@reduxjs/toolkit';
import reportesReducer from './reportesSlice';

export const store = configureStore({
  reducer: {
    reportes: reportesReducer,
  },
});
