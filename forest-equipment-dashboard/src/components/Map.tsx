import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const center: LatLngExpression = [-19.126536, -45.947756];
    return (
    <MapContainer 
      center={center} 
      zoom={10} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-19.126536, -45.947756]}>
        <Popup>
          Exemplo de Estado: Operando
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;