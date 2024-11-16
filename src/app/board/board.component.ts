import { Component } from '@angular/core';
import { CellComponent } from "../cell/cell.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CellComponent,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  boardSize: number = 10;
  board: boolean[][]; 
  moves: number[][]; 
  firstMove: boolean = true;
  win: boolean = false;
  lose: boolean = false;
  currentMove: number = 0; 
  knightPosition: { row: number; col: number }; 
  wasKnight: { row: number; col: number }[]; 
  validMoves: { row: number; col: number; canGo: boolean }[] = [];

  constructor() {
    this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(false));
    this.moves = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(0));
    this.knightPosition = { row: -1, col: -1 };
    this.wasKnight = [];
    this.validMoves = [];
  }

  reset() {
    this.wasKnight = [];
    this.currentMove = 0;
    this.win = false;
    this.lose = false;
    this.knightPosition = { row: -1, col: -1 };
    this.moves = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(0));
    this.validMoves = [];
    this.firstMove = true;
}

  placeKnight(row: number, col: number) {
    this.board[row][col] = true;
    this.moves[row][col] = ++this.currentMove;
    this.knightPosition = { row, col };
    this.wasKnight.push({ row, col });
  }

  moveKnight(newRow: number, newCol: number) {
    if (this.firstMove) {
      this.placeKnight(newRow, newCol);
      this.validMoves = this.getValidMoves();
      this.firstMove = false;
    } else {
      if (!this.wasKnight.some(pos => pos.row === newRow && pos.col === newCol)) {
        const validMoves = this.getValidMoves();
        if (validMoves.some(move => move.row === newRow && move.col === newCol)) {
          this.board[this.knightPosition.row][this.knightPosition.col] = false; 
          this.placeKnight(newRow, newCol);
          this.validMoves = this.getValidMoves();
          if (this.currentMove === this.boardSize * this.boardSize) {
            this.win = true;
          }
          if (this.validMoves.length === 0 && this.win !== true) {
            this.lose = true;
          }
        }
      }
    }
  }

  getValidMoves() {
    const moves = [
      { row: -2, col: -1 }, { row: -1, col: -2 },
      { row: 1, col: -2 }, { row: 2, col: -1 },
      { row: 2, col: 1 }, { row: 1, col: 2 },
      { row: -1, col: 2 }, { row: -2, col: 1 }
    ];
    
    const validMoves = [];
    for (const move of moves) {
      const newRow = this.knightPosition.row + move.row;
      const newCol = this.knightPosition.col + move.col;
      if (this.isInBounds(newRow, newCol) && !this.wasKnight.some(pos => pos.row === newRow && pos.col === newCol)) {
        validMoves.push({ row: newRow, col: newCol, canGo: true });
      }
    }
    return validMoves;
  }

  isInBounds(row: number, col: number) {
    return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
  }

  isCellAvailable(rowIndex: number, colIndex: number): boolean {
    return this.validMoves.some(move => move.row === rowIndex && move.col === colIndex);
  }
}
