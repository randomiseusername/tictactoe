import type { Cell } from './game.types';

export function randomMove(board: Cell[]): number {
  const free: number[] = [];
  for (let i = 0; i < board.length; i++) if (board[i] === null) free.push(i);
  if (!free.length) return -1;
  return free[Math.floor(Math.random() * free.length)];
}
