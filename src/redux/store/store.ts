import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../slices/modalSlice';
import coordinatesReducer from '../slices/coordinatesSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    coordinates: coordinatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;