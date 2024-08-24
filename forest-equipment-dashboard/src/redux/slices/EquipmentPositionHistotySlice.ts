import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EquipmentPositionHistory } from '../../types/EquipmentPositionHistory';

interface EquipmentPositionHistoryState {
  history: EquipmentPositionHistory[];
}

const initialState: EquipmentPositionHistoryState = {
  history: [],
};

export const fetchEquipmentPositionHistory = createAsyncThunk(
  'equipmentPositionHistory/fetch',
  async () => {
    const response = await fetch('/data/equipmentPositionHistory.json');
    const data: EquipmentPositionHistory[] = await response.json();
    return data;
  }
);

const equipmentPositionHistorySlice = createSlice({
  name: 'equipmentPositionHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipmentPositionHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default equipmentPositionHistorySlice.reducer;