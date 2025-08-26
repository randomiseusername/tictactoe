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
    
    this.game.setMode(payload.mode); // Persist the selected play mode (single-player or two-player).
    
    this.game.setPlayerStarts(payload.mark); // Configure which mark the local player starts with (X or O).
    this.game.start();
  }

  onReplay() { this.game.start(); }
  onCell(i: number) { this.game.playHuman(i); }
}


export const App = AppComponent;
