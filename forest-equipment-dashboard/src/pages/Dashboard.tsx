import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchEquipment } from '../redux/slices/equipmentSlice';
import { fetchEquipmentPositionHistory } from '../redux/slices/EquipmentPositionHistotySlice';
import Map from '../components/Map';
import EquipmentModal from '../components/EquipmentModal';
import { Equipment } from '../types/Equipment';

const Dashboard = () => {
  const dispatch = useDispatch();
  const equipmentList = useSelector((state: RootState) => state.equipment.equipment);
  const equipmentPositionHistory = useSelector((state: RootState) => state.equipmentPositionHistory.history);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    dispatch(fetchEquipment() as any); 
    dispatch(fetchEquipmentPositionHistory() as any); 
  }, [dispatch]);

  return (
    <>
      <Map 
        equipmentList={equipmentList}
        equipmentPositionHistory={equipmentPositionHistory}
        onMarkerClick={(equipment: Equipment) => setSelectedEquipment(equipment)}
      />
      {selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </>
  );
};

export default Dashboard;