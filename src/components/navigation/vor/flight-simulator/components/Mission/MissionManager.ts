// src/components/flight-simulator/components/Mission/MissionManager.ts
import type { Mission, MissionObjective, MissionState } from './types';
import type { AircraftState, VorStation } from '../Map/types';
import { isOnRadial, calculateDistance } from '../../utils/navigation';

export class MissionManager {
  private mission: Mission | null = null;
  private currentObjectiveIndex: number = 0;
  private isCompleted: boolean = false;
  private startTime: number | null = null;
  private objectiveStartTime: number | null = null;

  resetMission() {
    this.mission = null;
    this.currentObjectiveIndex = 0;
    this.isCompleted = false;
    this.startTime = null;
    this.objectiveStartTime = null;
  }

  startMission(mission: Mission) {
    this.mission = { ...mission };
    this.mission.objectives = this.mission.objectives.map(obj => ({
      ...obj,
      completed: false
    }));
    this.currentObjectiveIndex = 0;
    this.isCompleted = false;
    this.startTime = Date.now();
    this.objectiveStartTime = Date.now();
  }

  checkObjective(
    aircraft: AircraftState, 
    activeStationId: string | null, 
    stations: VorStation[]
  ): boolean {
    if (!this.mission || this.isCompleted) return false;

    const objective = this.mission.objectives[this.currentObjectiveIndex];
    if (objective.completed) return false;

    let isCompleted = false;

    switch (objective.type) {
      case 'intercept':
        if (objective.stationId && activeStationId === objective.stationId) {
          const station = stations.find(s => s.id === objective.stationId);
          if (station) {
            isCompleted = isOnRadial(
              aircraft.position,
              station.position,
              objective.radial!,
              objective.tolerance || 3
            );
          }
        }
        break;

      case 'follow':
        if (objective.stationId && activeStationId === objective.stationId) {
          const station = stations.find(s => s.id === objective.stationId);
          if (station) {
            const isOnTrack = isOnRadial(
              aircraft.position,
              station.position,
              objective.radial!,
              objective.tolerance || 5
            );
            
            if (isOnTrack) {
              const currentTime = Date.now();
              const timeOnTrack = currentTime - (this.objectiveStartTime || currentTime);
              
              if (timeOnTrack >= (objective.duration || 5000)) {
                isCompleted = true;
              }
            } else {
              this.objectiveStartTime = Date.now();
            }
          }
        }
        break;

      case 'reach':
        if (objective.position) {
          const distance = calculateDistance(aircraft.position, objective.position);
          isCompleted = distance <= (objective.tolerance || 20);
        }
        // Добавляем обработку цели по stationId
        else if (objective.stationId) {
          const station = stations.find(s => s.id === objective.stationId);
          if (station) {
            const distance = calculateDistance(aircraft.position, station.position);
            isCompleted = distance <= (objective.tolerance || 50);
          }
        }
        break;
    }

    if (isCompleted) {
      objective.completed = true;
      this.objectiveStartTime = Date.now();
      
      if (this.currentObjectiveIndex < this.mission.objectives.length - 1) {
        this.currentObjectiveIndex++;
      } else {
        this.isCompleted = true;
      }
      
      return true;
    }

    return false;
  }

  getCurrentObjective(): MissionObjective | null {
    if (!this.mission) return null;
    return this.mission.objectives[this.currentObjectiveIndex];
  }

  getProgress(): number {
    if (!this.mission) return 0;
    const completed = this.mission.objectives.filter(obj => obj.completed).length;
    return (completed / this.mission.objectives.length) * 100;
  }

  getMissionState(): MissionState {
    return {
      currentMission: this.mission,
      currentObjective: this.getCurrentObjective(),
      currentObjectiveIndex: this.currentObjectiveIndex,
      isCompleted: this.isCompleted,
      startTime: this.startTime,
      endTime: this.isCompleted ? Date.now() : null
    };
  }

  reset() {
    this.mission = null;
    this.currentObjectiveIndex = 0;
    this.isCompleted = false;
    this.startTime = null;
    this.objectiveStartTime = null;
  }
}