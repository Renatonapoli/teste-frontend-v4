import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css'; 

interface Equipment {
  id: string;
  lat: number;
  lon: number;
  date: string;
  time: string;
}
interface EquipmentStateData {
  [key: string]: {
    state: string;
  };
}

interface EquipmentMapProps {
  equipmentData: Equipment[];
  equipmentStateData: EquipmentStateData;
}

const Map: React.FC<EquipmentMapProps> = ({ equipmentData, equipmentStateData }) => {
  const getStateClass = (state: string) => {
    switch (state) {
      case 'Operando':
        return 'state-operating';
      case 'Parado':
        return 'state-idle';
      case 'Manutenção':
        return 'state-maintenance';
      default:
        return '';
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipmentData.map(equipment => (
        <Marker
          key={equipment.id}
          position={[equipment.lat, equipment.lon]}
        >
          <Popup>
            <div>
              <p>ID do Equipamento: {equipment.id}</p>
              <p>Data: {equipment.date}</p>
              <p>Hora: {equipment.time}</p>
              {equipmentStateData[equipment.id] && (
                <p className={`state-status ${getStateClass(equipmentStateData[equipment.id].state)}`}>
                  Estado: {equipmentStateData[equipment.id].state}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;