import { Injectable, signal } from '@angular/core';
import type { Cell, Mark, Status } from './game/game.types';
import { checkWin, checkDraw } from './game/game.rules';
import { randomMove } from './game/game.ai';

@Injectable({ providedIn: 'root' })
export class GameStoreService {
  // Configurable constants for later improvements
  private readonly boardSize = 5; // board size (n x n)
  private readonly winLength = 3; // number of aligned marks required to win

  // Reactive state signals
  boardState = signal<Cell[]>(Array(this.boardSize * this.boardSize).fill(null));
  currentPlayer = signal<Mark>('X');
  // 'gameMode' holds whether the game is single-player (AI) or two-player.
  gameMode = signal<'single' | 'two'>('single');
  // 'status' tracks the game lifecycle: 'idle' | 'playing' | 'won' | 'draw'
  status  = signal<Status>('idle');
  // 'winner' is set when a player wins; undefined otherwise.
  winner  = signal<Mark | undefined>(undefined);
  // 'startingPlayer' stores which mark the local human player has chosen to start.
  startingPlayer = signal<Mark>('X'); // chosen by the UI

  // Public API to update configuration
  setStartingPlayer(m: Mark) { this.startingPlayer.set(m); }
  // Set the game mode. Call this before 'startGame()' to ensure correct behavior.
  setGameMode(m: 'single' | 'two') { this.gameMode.set(m); }

  start() {
  // Reset board and state
  this.boardState.set(Array(this.boardSize * this.boardSize).fill(null));
    this.status.set('playing');
    this.winner.set(undefined);

    // Decide who plays first:
    // - In two-player mode the selected player always starts.
    // - In single-player mode, if the human chose 'O' the computer plays first.
    if (this.gameMode() === 'single' && this.startingPlayer() === 'O') {
      // computer should start as 'X' and immediately take its turn
      this.currentPlayer.set('X');
      this.computerTurn();
    } else {
      // human starts with their chosen mark
      this.currentPlayer.set(this.startingPlayer());
    }
  }

  playHuman(cellIndex: number) {
    if (this.status() !== 'playing') return; // finished game
    const b = this.boardState();
    if (b[cellIndex] !== null) return;  // cell already taken

    // Place the human's mark in the chosen cell
    this.place(cellIndex, this.currentPlayer());
    if (this.tryFinish()) return;   // stop if game finished

    // Switch turn to the other player
    this.switch();

    // Only invoke the AI after a human move when in single-player mode.
    if (this.gameMode() === 'single') {
      this.computerTurn();
    }
  }

  // ---- internals ----
  private computerTurn() {
    if (this.status() !== 'playing') return;
    const chosenIndex = randomMove(this.boardState()); // AI chooses free spot
    if (chosenIndex < 0) return; // no more cells
    this.place(chosenIndex, this.currentPlayer());
    if (this.tryFinish()) return;
    this.switch();
  }

  private place(cellIndex: number, mark: Mark) {
    const b = this.boardState().slice();  // create a copy of the board
    b[cellIndex] = mark;
    this.boardState.set(b);
  }

  private switch() { this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X'); }

  private tryFinish(): boolean {
  const w = checkWin(this.boardState(), this.boardSize, this.winLength);
    if (w) { this.status.set('won'); this.winner.set(w); return true; }
    if (checkDraw(this.boardState())) { this.status.set('draw'); return true; }
    return false;
  }

  
  get size() { return this.boardSize; }
  get win()  { return this.winLength; }
}
