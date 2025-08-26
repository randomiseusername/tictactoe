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
  // Output event: emits a compact payload object containing the selected mark
  // and the desired game mode. Using a single payload.
  @Output() start = new EventEmitter<{ mark: Mark; mode: 'single' | 'two' }>();
  
  @Output() replay = new EventEmitter<void>(); // Replay event: parent component will restart the game when received.


  localChoice: Mark = this.playerStarts;
  
  localMode: 'single' | 'two' = 'single';

  // Keep localChoice in sync with an incoming 'playerStarts' input.
  ngOnChanges() { this.localChoice = this.playerStarts; }
  
  // Called when the user clicks the "Commencer" button. Emit the selected
  // configuration so the parent (AppComponent) can persist it and start the game.
  startGame() { this.start.emit({ mark: this.localChoice, mode: this.localMode }); }
}
