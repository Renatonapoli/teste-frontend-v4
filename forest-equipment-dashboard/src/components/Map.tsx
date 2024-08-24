import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Equipment } from '../types/Equipment';
import { EquipmentPositionHistory } from '../types/EquipmentPositionHistory';

interface MapProps {
  onMarkerClick: (equipment: Equipment) => void;
  equipmentList: Equipment[];
  equipmentPositionHistory: EquipmentPositionHistory[];
}

const Map: React.FC<MapProps> = ({ onMarkerClick, equipmentList, equipmentPositionHistory }) => {
  const center: LatLngExpression = [-19.126536, -45.947756];

  return (
    <MapContainer center={center} zoom={10} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {equipmentList.map((item) => {
        const positions = equipmentPositionHistory.find(history => history.equipmentId === item.id)?.positions || [];
        
        return (
          <React.Fragment key={item.id}>
            <Marker
              position={positions.length > 0 ? [positions[0].lat, positions[0].lon] : center}
              eventHandlers={{
                click: () => {
                  onMarkerClick(item);
                },
              }}
            >
              <Popup>{item.name}</Popup>
            </Marker>
            <Polyline
              positions={positions.map(pos => [pos.lat, pos.lon])}
              color="blue"
              weight={2}
            />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default Map;