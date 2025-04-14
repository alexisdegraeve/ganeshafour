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

  constructor() {}
  activeCell(i: number, j: number, cell: any) {
    console.log(i, ' ', j, ' ', cell);
    const firstCellIndex = this.giveFirstEmpty(j);
    if (firstCellIndex !== null) {
      this.myBoard[firstCellIndex][j] = 1;
      this.lastMove = { row: firstCellIndex, col: j };
      console.log('HUMAN : ' ,this.checkWinner(i, j, 1));
      this.computerPlay();
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
          console.log('COMPUTER : ' ,this.checkWinner(this.lastMove.row, this.lastMove.col, 2));
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
    // Check Horizontale Right
    if (this.checkHorizontalRight(rowRef, colRef, player)) {
      return true;
    }

    // Check Horizontale Left
    if (this.checkHorizontalLeft(rowRef, colRef, player)) {
      return true;
    }

    // Check Verticale down
    if (this.checkVerticalDown(rowRef, colRef, player)) {
      return true;
    }

    // Check Verticale up
    if (this.checkVerticalUp(rowRef, colRef, player)) {
      return true;
    }

    // Check Diagonale down
    if (this.checkDiagonaleDown(rowRef, colRef, player)) {
      return true;
    }

    // Check Diagonale up
    if (this.checkDiagonaleUp(rowRef, colRef, player)) {
      return true;
    }
    return false;
  }

  checkHorizontalRight(
    rowRef: number,
    colDef: number,
    player: number
  ): boolean {
    let cpt = 0;
    for (let index = colDef; index < this.myBoard[0].length; index++) {
      if (this.myBoard[rowRef][index] === player) {
        cpt++;
      }
      if (cpt === 4) {
        break;
      }
    }
    if (cpt === 4) {
      return true;
    }
    return false;
  }

  checkHorizontalLeft(rowRef: number, colDef: number, player: number): boolean {
    let cpt = 0;
    for (let index = colDef; index >= 0; index--) {
      if (this.myBoard[rowRef][index] === player) {
        cpt++;
      }
      if (cpt === 4) {
        break;
      }
    }
    if (cpt === 4) {
      return true;
    }
    return false;
  }

  checkVerticalDown(rowRef: number, colDef: number, player: number): boolean {
    let cpt = 0;
    for (let index = rowRef; index < this.myBoard.length; index++) {
      if (this.myBoard[index][colDef] === player) {
        cpt++;
      }
      if (cpt === 4) {
        break;
      }
    }
    if (cpt === 4) {
      return true;
    }
    return false;
  }

  checkVerticalUp(rowRef: number, colDef: number, player: number): boolean {
    let cpt = 0;
    for (let index = rowRef; index >= 0; index--) {
      if (this.myBoard[index][colDef] === player) {
        cpt++;
      }
      if (cpt === 4) {
        break;
      }
    }
    if (cpt === 4) {
      return true;
    }
    return false;
  }

  checkDiagonaleDown(rowRef: number, colDef: number, player: number): boolean {
    let cpt = 0;
    let col = colDef;
    let row = rowRef;
    while (col < this.myBoard[0].length && row < this.myBoard.length) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      }
      col++;
      row++;
    }
    return cpt >= 4;
  }

  checkDiagonaleUp(rowRef: number, colDef: number, player: number): boolean {
    let cpt = 0;
    let col = colDef;
    let row = rowRef;
    while (col >= 0 && row >= 0) {
      if (this.myBoard[row][col] === player) {
        cpt++;
      }
      col--;
      row--;
    }
    return cpt >= 4;
  }
}
