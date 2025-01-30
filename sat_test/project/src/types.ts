export interface Satellite {
  id: string;
  latitude: number;
  longitude: number;
  height_km: number;
  velocity_kms: number;
  version: string;
  launch: string;
}

export interface SatellitePass {
  id: string;
  name: string;
  passStartTime: number;
  passEndTime: number;
  maxElevation: number;
  duration: number;
}

export interface WifiNetwork {
  ssid: string;
  strength: number;
  security: string;
  frequency: string;
  channel: number;
  lastSeen: Date;
}

export interface BluetoothDevice {
  name: string;
  macAddress: string;
  rssi: number;
  type: string;
  lastSeen: Date;
}

export interface RFIDTag {
  id: string;
  type: string;
  protocol: string;
  distance: number;
  lastSeen: Date;
}