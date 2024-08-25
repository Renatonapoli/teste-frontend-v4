import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import { RootState, AppDispatch } from '../redux/store';
import { setEquipmentStates, setEquipmentStateHistory, setEquipmentPositions } from '../redux/slices/equipmentSlice';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionData from '../data/equipmentPositionHistory.json';
import 'leaflet/dist/leaflet.css';
import '../styles/Dashboard.css'; 

const createCustomIcon = (color: string) => {
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 3.86 5.11 11.54 6.18 13.11.41.59 1.22.59 1.63 0C13.89 20.54 19 12.86 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
      </svg>
    `)}`,
    iconSize: [30, 30],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const states = useSelector((state: RootState) => state.equipment.states);
  const stateHistory = useSelector((state: RootState) => state.equipment.stateHistory);
  const positions = useSelector((state: RootState) => state.equipment.positions);

  // Declarando as variáveis de filtro
  const [filterId, setFilterId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterModel, setFilterModel] = useState('');

  useEffect(() => {
    dispatch(setEquipmentStates(equipmentStateData));
    dispatch(setEquipmentStateHistory(equipmentStateHistoryData));
    dispatch(setEquipmentPositions(equipmentPositionData)); 
  }, [dispatch]);

  const getStateById = (stateId: string) => {
    return states.find(s => s.id === stateId);
  };

  const filteredPositions = positions.filter(equipment => {
    const history = stateHistory.find(history => history.equipmentId === equipment.equipmentId);
    const hasMatchingStatus = history?.states.some(entry => {
      const state = getStateById(entry.equipmentStateId);
      return state?.name === filterStatus;
    });
  
    return (
      (filterId === '' || equipment.equipmentId.includes(filterId)) &&
      (filterStatus === '' || hasMatchingStatus) &&
      (filterModel === '' || equipment.equipmentId === filterModel)
    );
  });

  const renderEquipmentStates = () => (
    <div className="card">
      <h2>Estado dos Equipamentos</h2>
      <ul>
        {states.map(state => (
          <li key={state.id} style={{ color: state.color }}>
            <span className="bold-text">{state.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderStateHistory = () => (
    <div className="card">
      <h2>Histórico dos Equipamentos</h2>
      {stateHistory.map((history, index) => (
        <div key={index}>
          <h3 className="bold-text">ID do Equipamento: {history.equipmentId}</h3>
          <ul>
            {history.states.map((entry, idx) => {
              const state = getStateById(entry.equipmentStateId);
              return (
                <li key={idx} style={{ color: state?.color }}>
                  <span className="bold-text">{new Date(entry.date).toLocaleString()}:</span> 
                  <span>{state?.name || 'Unknown'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderMapMarkers = () => (
    filteredPositions.map((equipment) => (
      equipment.positions.map((pos, idx) => {
        const historyEntry = stateHistory
          .find(history => history.equipmentId === equipment.equipmentId)
          ?.states.find(state => new Date(state.date).getTime() <= new Date(pos.date).getTime());
  
        const state = historyEntry ? getStateById(historyEntry.equipmentStateId) : undefined;
        const iconColor = state?.color || 'gray';
  
        if (filterStatus === '' || (state && state.name === filterStatus)) {
          return (
            <Marker 
              key={`${equipment.equipmentId}-${idx}`} 
              position={[pos.lat, pos.lon]} 
              icon={createCustomIcon(iconColor)}
            >
              <Popup className="custom-popup">
                <div>
                  <span className="bold-text">ID do equipamento:</span> {equipment.equipmentId}<br />
                  <span className="bold-text">Data:</span> {new Date(pos.date).toLocaleString()}<br />
                  <span className="bold-text">Estatus:</span> <span style={{ color: iconColor }}>{state?.name || 'Unknown'}</span>
                </div>
              </Popup>
            </Marker>
          );
        }
  
        return null;
      })
    ))
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="search-card">
        <h2>Filtrar Equipamentos</h2>
        <input
          type="text"
          placeholder="ID do Equipamento"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value)}
        />
        <button onClick={() => { }}>
          Filtrar
        </button>
      </div>

      <MapContainer center={[-19.15, -46.00]} zoom={10} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderMapMarkers()}
        {filteredPositions.map((equipment) => (
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