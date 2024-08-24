export interface Equipment {
  id: string;
  name: string;
  model?: string; 
  state?: string;
  position?: {
    lat: number;
    lon: number;
  };
}