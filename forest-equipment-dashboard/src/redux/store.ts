import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './slices/equipmentSlice';
import equipmentPositionHistoryReducer from './slices/EquipmentPositionHistotySlice';

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    equipmentPositionHistory: equipmentPositionHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;