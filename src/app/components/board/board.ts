import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import type { Cell } from '../../game/game.types';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent {
  @Input({ required: true }) n!: number;
  @Input({ required: true }) board!: Cell[];
  @Input() disabled = false;
  @Output() cellClick = new EventEmitter<number>();

  trackByIndex = (i: number) => i;
}
