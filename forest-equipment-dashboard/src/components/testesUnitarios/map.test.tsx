import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from '../Map'; 

const mockEquipmentData = [
  {
    id: '1',
    lat: 51.505,
    lon: -0.09,
    date: '2024-08-25',
    time: '14:00',
  },
];

const mockEquipmentStateData = {
  '1': {
    state: 'Operando',
  },
};

describe('Map Component', () => {
  test('renders the map container', () => {
    render(
      <Map
        equipmentData={mockEquipmentData}
        equipmentStateData={mockEquipmentStateData}
      />
    );
    expect(screen.getByText(/ID do Equipamento: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Data: 2024-08-25/i)).toBeInTheDocument();
    expect(screen.getByText(/Hora: 14:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Estado: Operando/i)).toBeInTheDocument();
  });

  test('applies correct CSS class based on equipment state', () => {
    render(
      <Map
        equipmentData={mockEquipmentData}
        equipmentStateData={mockEquipmentStateData}
      />
    );
    
    const stateElement = screen.getByText(/Estado: Operando/i);
    expect(stateElement).toHaveClass('state-status');
    expect(stateElement).toHaveClass('state-operating');
  });

  test('renders multiple markers with different states', () => {
    const multipleEquipmentData = [
      { id: '1', lat: 51.505, lon: -0.09, date: '2024-08-25', time: '14:00' },
      { id: '2', lat: 51.515, lon: -0.1, date: '2024-08-26', time: '15:00' },
    ];

    const multipleEquipmentStateData = {
      '1': { state: 'Operando' },
      '2': { state: 'Parado' },
    };

    render(
      <Map
        equipmentData={multipleEquipmentData}
        equipmentStateData={multipleEquipmentStateData}
      />
    );

    expect(screen.getByText(/ID do Equipamento: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Estado: Operando/i)).toHaveClass('state-operating');
    expect(screen.getByText(/ID do Equipamento: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Estado: Parado/i)).toHaveClass('state-idle');
  });
});