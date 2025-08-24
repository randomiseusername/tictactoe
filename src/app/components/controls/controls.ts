import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Status, Mark } from '../../game/game.types';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.html',
  styleUrls: ['./controls.css'],
})
export class ControlsComponent {
  @Input() playerStarts: Mark = 'X';
  @Input() status: Status = 'idle';
  @Output() start = new EventEmitter<Mark>();
  @Output() replay = new EventEmitter<void>();

  localChoice: Mark = this.playerStarts;

  ngOnChanges() { this.localChoice = this.playerStarts; }
  startGame() { this.start.emit(this.localChoice); }
}
