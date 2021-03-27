export interface DeviceDetails {
  language: string;
  browser: {
    vendor: string;
    name: string;
    version: string;
    engine: string;
  };
  os: {
    vendor: string;
    name: string;
    version: string;
  };
  hardware: {
    cpu: {
      name: string;
      architecture: string;
      type: string;
      cores: number;
    };
    ram: {
      size: number;
      unit: string;
    };
    screen: {
      height: number;
      width: number;
      hasTouch: boolean;
      touchPoints: number;
    };
    gpu: {
      vendor: string;
      name: string;
    };
  };
  platform: {
    model: string;
    type: string;
    vendor: string;
  };
  deviceName: string;
}

export interface GetDeviceOptions {
  fallback?: string;
  navigator?: Navigator;
  canvas?: HTMLCanvasElement;
}
