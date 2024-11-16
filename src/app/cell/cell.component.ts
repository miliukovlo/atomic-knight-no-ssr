import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HorseComponent } from "../horse/horse.component";

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [
    CommonModule,
    HorseComponent
  ],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() isKnight: boolean = false;
  @Input() id: number = 0;
  @Input() moveNumber: number = 0;
  @Input() canGo: boolean = false;
  @Input() win: boolean = false;
  @Input() lose: boolean = false;
  @Input() gameStatus: boolean = false;
  @Output() cellClick = new EventEmitter<void>();

  onClick() {
    this.cellClick.emit();
  }
  getCellClass(): string {
    if (this.win === true || this.lose === true) {
      return this.id % 2 === 0 ? 'cell disabled' : 'cell disabled even'
    }
    if (this.id % 2 === 0) {
        return this.moveNumber ? 'cell disabled' : 'cell';
    } else {
        return this.moveNumber ? 'cell disabled even' : 'cell even';
    }
}

  getDotClass(): string {
      return this.id % 2 === 0 ? 'dot even' : 'dot odd';
  }
}
