import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  myBoard: (number | null)[][]=new Array(6).fill(null).map(() => new Array(7).fill(null));
  lastMove: { row: number, col: number } | null = null;


  constructor() {
  }
  activeCell(i: number, j: number, cell: any) {
    console.log(i, ' ', j , ' ',cell);
    const firstCellIndex = this.giveFirstEmpty(j);
    if(firstCellIndex !== null) {
      this.myBoard[firstCellIndex][j] = 1;
      this.lastMove = { row: firstCellIndex, col: j };
    }
  }

  giveFirstEmpty(col: number): number | null {
    if (col < 0 || col >= this.myBoard[0].length) return null;
    for (let index = this.myBoard.length - 1; index >= 0; index--) {
      if(this.myBoard[index][col] == null) {
        return index;
      }      
    }
    return null;
  }

  isJustPlayed(i: number, j: number): boolean {
    return this.lastMove?.row === i && this.lastMove?.col === j;
  }
}
