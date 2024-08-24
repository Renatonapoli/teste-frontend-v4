import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Equipment } from '../types/Equipment';

interface MapProps {
  onMarkerClick: (equipment: Equipment) => void;
  equipmentList: Equipment[];
}

const Map: React.FC<MapProps> = ({ onMarkerClick, equipmentList }) => {
  const center: LatLngExpression = [-19.126536, -45.947756];

  return (
    <>
      <MapContainer center={center} zoom={10} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {equipmentList.map((item) => (
          <Marker
            key={item.id}
            position={center}
            eventHandlers={{
              click: () => {
                onMarkerClick(item);
              },
            }}
          >
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;