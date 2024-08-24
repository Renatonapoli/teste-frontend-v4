import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEquipments as fetchEquipmentsService } from '../../services/equipmentService';
import { Equipment } from '../../types/Equipment';

interface EquipmentState {
  equipments: Equipment[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  equipments: [],
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        state.loading = false;
        state.equipments = action.payload;
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Erro desconhecido';
      });
  },
});

export const fetchEquipments = createAsyncThunk(
  'equipment/fetchEquipments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchEquipmentsService();
      return response.equipments;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export default equipmentSlice.reducer;