import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Score {
  id?: number;
  score: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LocalDBService extends Dexie {
  scores!: Table<Score, number>;
  constructor() {
    super('battleship');
    this.version(1).stores({
      scores: '++id, score',
    });
  }
}
