import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Equipment } from '../../types/Equipment';
interface EquipmentState {
  equipment: Equipment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EquipmentState = {
  equipment: [],
  status: 'idle',
};

export const fetchEquipment = createAsyncThunk<Equipment[]>(
  'equipment/fetchEquipment',
  async () => {
    const response = await fetch('/data/equipament.json');
    const data = await response.json();
    return data;
  }
);

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.equipment = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default equipmentSlice.reducer;