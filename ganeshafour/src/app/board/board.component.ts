import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  myBoard: (number | null)[][] = new Array(6)
    .fill(null)
    .map(() => new Array(7).fill(null));
  lastMove: { row: number; col: number } | null = null;
  startgame = false;
  winner: number | null = null;

  constructor() {}

  restart() {
    this.startgame = true;
    this.myBoard = new Array(6).fill(null).map(() => new Array(7).fill(null));
    this.lastMove = null;
    this.winner = null;
  }

  activeCell(i: number, j: number, cell: any) {
    console.log(i, ' ', j, ' ', cell);
    const firstCellIndex = this.giveFirstEmpty(j);
    if (firstCellIndex !== null) {
      this.myBoard[firstCellIndex][j] = 1;
      this.lastMove = { row: firstCellIndex, col: j };
      console.log('HUMAN : ' ,this.checkWinner(i, j, 1));
      this.winner = this.checkWinner(i, j, 1) ? 1 : null;
      if(!this.winner) {
        this.computerPlay();
      } else {
        this.startgame = false;
      }
    }
  }

  giveFirstEmpty(col: number): number | null {
    if (col < 0 || col >= this.myBoard[0].length) return null;
    for (let index = this.myBoard.length - 1; index >= 0; index--) {
      if (this.myBoard[index][col] == null) {
        return index;
      }
    }
    return null;
  }

  isJustPlayed(i: number, j: number): boolean {
    return this.lastMove?.row === i && this.lastMove?.col === j;
  }

  computerPlay() {
    console.log('Computert play');
    setTimeout(() => {
      // Trouver la ligne vide correspondate
      // Placer le pion
      // Mettre a jour last move

      // Rechercher une colonne dispo
      let searchCol = this.giveFirstColFree();
      if (searchCol !== null) {
        const firstCellIndex = this.giveFirstEmpty(searchCol);
        if (firstCellIndex !== null) {
          this.myBoard[firstCellIndex][searchCol] = 2;
          this.lastMove = { row: firstCellIndex, col: searchCol };
          this.winner = this.checkWinner(this.lastMove.row, this.lastMove.col, 2) ? 2 : null;
          if(this.winner) {
            this.startgame = false;
          }
        }
      }

      console.log('Computert finish to play');
    }, 500);
  }

  giveFirstColFree(): number | null {
    for (let col = 0; col < this.myBoard[0].length; col++) {
      for (let row = this.myBoard.length - 1; row >= 0; row--) {
        if (this.myBoard[row][col] === null) {
          return col;
        }
      }
    }
    return null;
  }

  checkWinner(rowRef: number, colRef: number, player: number): boolean {
    // Check Horizontale
    if (this.checkHorizontal(rowRef, colRef, player)>=4) {
      return true;
    }

    // Check Verticale
    if (this.checkVertical(rowRef, colRef, player)>=4) {
      return true;
    }

    // Check Diagonale
    if (this.checkDiagonaleUpLeft(rowRef, colRef, player)>=4 || (this.checkDiagonaleUpRight(rowRef, colRef, player)>=4)) {
      return true;
    }

    return false;
  }

  checkHorizontal(rowRef: number, colDef: number, player: number): number {
    let cpt = 1;
    for (let index = colDef + 1; index < this.myBoard[0].length; index++) {
      if (this.myBoard[rowRef][index] === player) {
        cpt++;
      } else {
        break;
      }
    }

    for (let index = colDef - 1; index >= 0; index--) {
      if (this.myBoard[rowRef][index] === player) {
        cpt++;
      } else {
        break;
      }
    }

    return cpt;
  }


  checkVertical(rowRef: number, colDef: number, player: number): number {
    let cpt = 1;
    for (let index = rowRef + 1; index < this.myBoard.length; index++) {
      if (this.myBoard[index][colDef] === player) {
        cpt++;
      } else {
        break;
      }
    }

    for (let index = rowRef - 1; index >= 0; index--) {
      if (this.myBoard[index][colDef] === player) {
        cpt++;
      } else {
        break;
      }
    }
    return cpt;
  }


  checkDiagonaleUpLeft(rowRef: number, colDef: number, player: number): number {
    let cpt = 1;
    let col = colDef + 1;
    let row = rowRef + 1;
    while (col < this.myBoard[0].length && row < this.myBoard.length) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      } else {
        break;
      }
      col++;
      row++;
    }

    col = colDef - 1;
    row = rowRef - 1;
    while (col >= 0 && row >= 0) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      } else {
        break;
      }
      col--;
      row--;
    }
    return cpt;
  }

  checkDiagonaleUpRight(rowRef: number, colDef: number, player: number): number {
    let cpt = 1;
    let col = colDef + 1;
    let row = rowRef - 1;
    while (col < this.myBoard[0].length && row >= 0) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      } else {
        break;
      }
      col++;
      row--;
    }

    col = colDef - 1;
    row = rowRef + 1;
    while (col >= 0 && row < this.myBoard.length) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      } else {
        break;
      }
      col--;
      row++;
    }
    return cpt;
  }

  computerBlockPlayer() {

  }

  computerAttackPlay() {

  }

  start() {
    this.restart();
  }

}
