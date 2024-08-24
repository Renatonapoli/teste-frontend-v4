import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  equipments: [],
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    fetchEquipmentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEquipmentsSuccess(state, action) {
      state.loading = false;
      state.equipments = action.payload;
    },
    fetchEquipmentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEquipmentsStart,
  fetchEquipmentsSuccess,
  fetchEquipmentsFailure,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;