import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setEquipmentStates, setEquipmentStateHistory, setEquipmentPositions } from '../redux/slices/equipmentSlice';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionData from '../data/equipmentPositionHistory.json';
import 'leaflet/dist/leaflet.css';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const states = useSelector((state: RootState) => state.equipment.states);
  const stateHistory = useSelector((state: RootState) => state.equipment.stateHistory);
  const positions = useSelector((state: RootState) => state.equipment.positions);

  useEffect(() => {
    dispatch(setEquipmentStates(equipmentStateData));
    dispatch(setEquipmentStateHistory(equipmentStateHistoryData));
    dispatch(setEquipmentPositions(equipmentPositionData)); 
  }, [dispatch]);

  const getStateNameById = (stateId: string) => {
    const state = states.find(s => s.id === stateId);
    return state ? state.name : 'Unknown';
  };

  const renderEquipmentStates = () => (
    <div>
      <h2>Equipment States</h2>
      <ul>
        {states.map(state => (
          <li key={state.id} style={{ color: state.color }}>
            {state.name}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderStateHistory = () => (
    <div>
      <h2>Equipment State History</h2>
      {stateHistory.map((history, index) => (
        <div key={index}>
          <h3>Equipment ID: {history.equipmentId}</h3>
          <ul>
            {history.states.map((entry, idx) => (
              <li key={idx}>
                <span>{new Date(entry.date).toLocaleString()}: </span>
                <span>{getStateNameById(entry.equipmentStateId)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Dashboard</h1>
    
      <MapContainer center={[-19.15, -46.00]} zoom={10} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((equipment) => (
          equipment.positions.map((pos, idx) => (
            <Marker key={`${equipment.equipmentId}-${idx}`} position={[pos.lat, pos.lon]}>
              <Popup>
                Equipment ID: {equipment.equipmentId}<br />
                Date: {new Date(pos.date).toLocaleString()}
              </Popup>
            </Marker>
          ))
        ))}
        {positions.map((equipment) => (
          <Polyline 
            key={equipment.equipmentId}
            positions={equipment.positions.map(pos => [pos.lat, pos.lon])}
            color="blue"
            weight={2}
          />
        ))}
      </MapContainer>
      {renderEquipmentStates()}
      {renderStateHistory()}
    </div>
  );
};

export default Dashboard;