import type { Cell, Mark } from './game.types';

export const idx = (r: number, c: number, n: number) => r * n + c;

export function checkWin(board: Cell[], n: number, k: number): Mark | null {
  const dirs: Array<[number, number]> = [[1,0],[0,1],[1,1],[1,-1]]; // → ↓ ↘ ↗
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const start = board[idx(r, c, n)];
      if (!start) continue;
      for (const [dr, dc] of dirs) {
        let count = 1, rr = r + dr, cc = c + dc;
        while (rr >= 0 && cc >= 0 && rr < n && cc < n && board[idx(rr, cc, n)] === start) {
          count++;
          if (count === k) return start;
          rr += dr; cc += dc;
        }
      }
    }
  }
  return null;
}

export const checkDraw = (board: Cell[]) => board.every(Boolean);
