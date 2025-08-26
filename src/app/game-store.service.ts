import { Injectable, signal } from '@angular/core';
import type { Cell, Mark, Status } from './game/game.types';
import { checkWin, checkDraw } from './game/game.rules';
import { randomMove } from './game/game.ai';

@Injectable({ providedIn: 'root' })
export class GameStoreService {
  // configurables constants for later improvements
  private readonly n = 3; // board size
  private readonly k = 3; // alignment 

  board = signal<Cell[]>(Array(this.n * this.n).fill(null));
  current = signal<Mark>('X');
  // 'mode' holds whether the game is single-player (AI) or two-player.
  mode = signal<'single' | 'two'>('single');
  // 'status' tracks the game lifecycle: 'idle' | 'playing' | 'won' | 'draw'
  status  = signal<Status>('idle');
  // 'winner' is set when a player wins; undefined otherwise.
  winner  = signal<Mark | undefined>(undefined);
  // 'playerStarts' stores which mark the local human player has chosen to start.
  playerStarts = signal<Mark>('X'); // chosen by the UI

  setPlayerStarts(m: Mark) { this.playerStarts.set(m); }
  // Set the game mode. Call this before 'start()' to ensure correct behavior.
  setMode(m: 'single' | 'two') { this.mode.set(m); }

  start() {
    this.board.set(Array(this.n * this.n).fill(null));
    this.current.set(this.playerStarts());
    this.status.set('playing');
    this.winner.set(undefined);

    // If the selected mode is single-player and the computer should start
    // (human chose 'O'), immediately run the computer's turn.
    if (this.current() === 'O' && this.mode() === 'single') {
      this.computerTurn();
    }
  }

  playHuman(i: number) {
    if (this.status() !== 'playing') return; // finished game
    const b = this.board();
    if (b[i] !== null) return;  // cell already taken

    this.place(i, this.current());  // place the mark
    if (this.tryFinish()) return;   // check for win/draw

    this.switch();
  // Only invoke the AI after a human move when in single-player mode.
  if (this.mode() === 'single') { this.computerTurn(); }
  }

  // ---- internals ----
  private computerTurn() {
    if (this.status() !== 'playing') return;
    const i = randomMove(this.board()); // AI chooses free spot
    if (i < 0) return; // no more cells
    this.place(i, this.current());
    if (this.tryFinish()) return;
    this.switch();
  }

  private place(i: number, mark: Mark) {
    const b = this.board().slice();  // create a copy of the board
    b[i] = mark;
    this.board.set(b);
  }

  private switch() { this.current.set(this.current() === 'X' ? 'O' : 'X'); }

  private tryFinish(): boolean {
    const w = checkWin(this.board(), this.n, this.k);
    if (w) { this.status.set('won'); this.winner.set(w); return true; }
    if (checkDraw(this.board())) { this.status.set('draw'); return true; }
    return false;
  }

  
  get size() { return this.n; }
  get win()  { return this.k; }
}
