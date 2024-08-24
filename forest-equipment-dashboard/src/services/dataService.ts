import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';

export const fetchEquipmentData = () => Promise.resolve(equipmentData);
export const fetchEquipmentModelData = () => Promise.resolve(equipmentModelData);