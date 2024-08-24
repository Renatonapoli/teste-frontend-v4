export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  model?: string; 
  state?: string;
  position?: {
    lat: number;
    lon: number;
  };
}