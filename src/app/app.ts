import { Component, inject } from '@angular/core';
import { BoardComponent } from './components/board/board';
import { GameStoreService } from './game-store.service';
import { ControlsComponent } from './components/controls/controls';
import { StatusBarComponent } from './components/status-bar/status-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, ControlsComponent, StatusBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  game = inject(GameStoreService);

  // expect payload { mark, mode } from ControlsComponent
  // Handle the start event emitted by the controls component.
  // The controls component emits a single payload object { mark, mode } to
  // keep the API compact.
  onStart(payload: { mark: 'X'|'O'; mode: 'single' | 'two' }) {
    // Persist the selected play mode (single-player or two-player).
    this.game.setGameMode(payload.mode);
    // Configure which mark the local player starts with (X or O).
    this.game.setStartingPlayer(payload.mark);
    // Start a new game using the configured options.
    this.game.start();
  }

  onReplay() { this.game.start(); }
  onCell(cellIndex: number) { this.game.playHuman(cellIndex); }
}


export const App = AppComponent;
