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

  onStart(mark: 'X'|'O') { this.game.setPlayerStarts(mark); this.game.start(); }
  onReplay() { this.game.start(); }
  onCell(i: number) { this.game.playHuman(i); }
}


export const App = AppComponent;
