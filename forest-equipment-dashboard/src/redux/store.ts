import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './slices/equipmentSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});

export default store;