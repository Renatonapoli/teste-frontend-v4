import equipmentData from '../data/equipment.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';

export const fetchEquipments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        equipments: equipmentData,
        stateHistory: equipmentStateHistoryData,
      });
    }, 1000);
  });
};