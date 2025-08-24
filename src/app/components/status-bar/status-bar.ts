import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import type { Status, Mark } from '../../game/game.types';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './status-bar.html',
  styleUrls: ['./status-bar.css'],
})
export class StatusBarComponent {
  @Input() status: Status = 'idle';
  @Input() current: Mark = 'X';
  @Input() winner?: Mark;

  get text(): string {
    if (this.status === 'idle') return 'Prêt à jouer.';
    if (this.status === 'playing') return `À ${this.current} de jouer.`;
    if (this.status === 'won') return `🎉 ${this.winner} a gagné !`;
    return 'Match nul.';
  }
}
