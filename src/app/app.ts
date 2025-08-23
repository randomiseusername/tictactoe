import { Component, inject } from '@angular/core';
import { BoardComponent } from './components/board/board';
import { GameStoreService } from './game-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent],            // NgIf retiré (inutile)
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  game = inject(GameStoreService);

  startAs(mark: 'X' | 'O') { this.game.setPlayerStarts(mark); this.game.start(); }
  replay() { this.game.start(); }
  onCell(i: number) { this.game.playHuman(i); }

  get statusText(): string {
    const s = this.game.status();
    if (s === 'idle') return 'Clique “Start” pour jouer.';
    if (s === 'playing') return `À ${this.game.current()} de jouer.`;
    if (s === 'won') return `🎉 ${this.game.winner()} a gagné !`;
    return 'Match nul.';
  }
}

export const App = AppComponent;
