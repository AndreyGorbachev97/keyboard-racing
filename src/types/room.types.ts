import { Player } from './index';

export interface Room {
  creatorId: string;
  players: Player[];
  sampleText: string;
  status: string;
  roomName: string;
}
