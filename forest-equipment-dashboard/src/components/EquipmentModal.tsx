import React from 'react';
import { Equipment } from '../types/Equipment';

interface EquipmentModalProps {
  equipment: Equipment | null;
  onClose: () => void;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({ equipment, onClose }) => {
  if (!equipment) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{equipment.name}</h2>
        <p>Modelo: {equipment.model}</p>
        <p>Estado Atual: {equipment.state}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default EquipmentModal;