import React from 'react';
import { Equipment } from '../types/Equipment';

interface EquipmentPopupProps {
  equipment: Equipment;
}

const EquipmentPopup: React.FC<EquipmentPopupProps> = ({ equipment }) => {
  return (
    <div className="popup-content">
      <h2>{equipment.name}</h2>
      <p>Estado: {equipment.state}</p>
      <p>Última Posição: {equipment.position?.lat}, {equipment.position?.lon}</p>
    </div>
  );
};

export default EquipmentPopup;