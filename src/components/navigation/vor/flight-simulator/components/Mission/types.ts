// src/components/flight-simulator/components/Mission/types.ts
export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  objectives: MissionObjective[];
  initialPosition: { x: number; y: number };
  initialHeading: number;
  wind?: {
    direction: number;
    speed: number;
    enabled: boolean;
  };
}

export interface MissionObjective {
  id: string;
  type: 'intercept' | 'follow' | 'reach' | 'identify';
  description: string;
  stationId?: string;
  radial?: number;
  toFrom?: 'TO' | 'FROM';
  position?: { x: number; y: number };
  tolerance?: number;
  duration?: number; // Для задач типа 'follow'
  completed: boolean;
}

export interface MissionState {
  currentMission: Mission | null;
  currentObjective: MissionObjective | null;
  currentObjectiveIndex: number;
  isCompleted: boolean;
  startTime: number | null;
  endTime: number | null;
}