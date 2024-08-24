import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentState, EquipmentStateHistory, EquipmentPositionHistory } from '../../types/EquipmentState';

interface EquipmentStateType {
  states: EquipmentState[];
  stateHistory: EquipmentStateHistory[];
  positions: EquipmentPositionHistory[];
}

const initialState: EquipmentStateType = {
  states: [],
  stateHistory: [],
  positions: [],
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipmentStates(state, action: PayloadAction<EquipmentState[]>) {
      state.states = action.payload;
    },
    setEquipmentStateHistory(state, action: PayloadAction<EquipmentStateHistory[]>) {
      state.stateHistory = action.payload;
    },
    setEquipmentPositions(state, action: PayloadAction<EquipmentPositionHistory[]>) { 
      state.positions = action.payload;
    },
  },
});

export const { setEquipmentStates, setEquipmentStateHistory, setEquipmentPositions } = equipmentSlice.actions;
export default equipmentSlice.reducer;