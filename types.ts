
export enum TrafficStatus {
  FLUID = 'FLUID',
  SLOW = 'SLOW',
  STALL = 'STALL',
  ACCIDENT = 'ACCIDENT',
  CLOSURE = 'CLOSURE'
}

export interface UserReport {
  id: string;
  userName: string;
  userAvatar: string;
  timestamp: Date;
  location: string;
  description: string;
  status: TrafficStatus;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: number;
  comments: number;
  isSocialMediaSource?: boolean;
  coords?: {
    lat: number;
    lng: number;
  };
}

export interface RouteStatus {
  origin: string;
  destination: string;
  overallStatus: TrafficStatus;
  estimatedTime: string;
  activeAlerts: number;
}
