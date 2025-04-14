import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  myBoard: (number | null)[][] = new Array(6)
    .fill(null)
    .map(() => new Array(7).fill(null));
  lastMove: { row: number | null; col: number | null } | null = null;
  startgame = false;
  winner: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  restart() {
    this.startgame = true;
    this.myBoard = new Array(6).fill(null).map(() => new Array(7).fill(null));
    this.lastMove = null;
    this.winner = null;
  }

  activeCell(i: number, j: number, cell: any) {
    const firstCellIndex = this.giveFirstEmpty(j);
    if (firstCellIndex !== null) {
      this.myBoard[firstCellIndex][j] = 1;
      this.lastMove = { row: firstCellIndex, col: j };
      this.winner = this.checkWinner(i, j, 1) ? 1 : null;
      if (!this.winner) {
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
    setTimeout(() => {
      if (!this.computerAttackPlay()) {
        if (!this.computerBlockPlayer()) {
          this.randomComputerMove();
        }
      }

      if (this.lastMove && this.lastMove.row && this.lastMove.col) {
        this.winner = this.checkWinner(this.lastMove.row, this.lastMove.col, 2)
          ? 2
          : null;
        if (this.winner) {
          this.startgame = false;
        }
      }
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
    if (this.checkHorizontal(rowRef, colRef, player) >= 4) {
      return true;
    }

    // Check Verticale
    if (this.checkVertical(rowRef, colRef, player) >= 4) {
      return true;
    }

    // Check Diagonale
    if (
      this.checkDiagonaleUpLeft(rowRef, colRef, player) >= 4 ||
      this.checkDiagonaleUpRight(rowRef, colRef, player) >= 4
    ) {
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

  checkDiagonaleUpRight(
    rowRef: number,
    colDef: number,
    player: number
  ): number {
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

  computerBlockPlayer(): boolean {
    for (let row = 0; row < this.myBoard.length; row++) {
      for (let col = 0; col < this.myBoard[0].length; col++) {
        // Vérifie chaque direction : HORIZONTALE, VERTICALE, DIAGONALES

        // HORIZONTALE
        if (this.checkHorizontal(row, col, 1) >= 3) {
          // Tente de bloquer à droite
          const right = col + 1;
          if (right < this.myBoard[0].length) {
            const emptyRow = this.giveFirstEmpty(right);
            if (emptyRow !== null) {
              this.myBoard[emptyRow][right] = 2;
              this.lastMove = { row: emptyRow, col: right };
              return true;
            }
          }
          // Tente de bloquer à gauche
          const left = col - 1;
          if (left >= 0) {
            const emptyRow = this.giveFirstEmpty(left);
            if (emptyRow !== null) {
              this.myBoard[emptyRow][left] = 2;
              this.lastMove = { row: emptyRow, col: left };
              return true;
            }
          }
        }

        // VERTICALE
        if (this.checkVertical(row, col, 1) >= 3) {
          const below = row + 1;
          if (below < this.myBoard.length && this.myBoard[below][col] === 0) {
            this.myBoard[below][col] = 2;
            this.lastMove = { row: below, col: col };
            return true;
          }
        }

        // DIAGONALE UP-LEFT
        if (this.checkDiagonaleUpLeft(row, col, 1) >= 3) {
          const targetCol = col + 1;
          const targetRow = row + 1;
          if (
            targetCol < this.myBoard[0].length &&
            targetRow < this.myBoard.length &&
            this.myBoard[targetRow][targetCol] === 0 &&
            (targetRow === this.myBoard.length - 1 ||
              this.myBoard[targetRow + 1][targetCol] !== 0)
          ) {
            this.myBoard[targetRow][targetCol] = 2;
            this.lastMove = { row: targetRow, col: targetCol };
            return true;
          }
        }

        // DIAGONALE UP-RIGHT
        if (this.checkDiagonaleUpRight(row, col, 1) >= 3) {
          const targetCol = col - 1;
          const targetRow = row + 1;
          if (
            targetCol >= 0 &&
            targetRow < this.myBoard.length &&
            this.myBoard[targetRow][targetCol] === 0 &&
            (targetRow === this.myBoard.length - 1 ||
              this.myBoard[targetRow + 1][targetCol] !== 0)
          ) {
            this.myBoard[targetRow][targetCol] = 2;
            this.lastMove = { row: targetRow, col: targetCol };
            return true;
          }
        }
      }
    }

    return false;
  }

  computerAttackPlay(): boolean {
    for (let row = 0; row < this.myBoard.length; row++) {
      for (let col = 0; col < this.myBoard[0].length; col++) {
        // Vérification des différentes directions pour attaquer

        // HORIZONTALE
        if (this.checkHorizontal(row, col, 2) >= 3) {
          const right = col + 1;
          if (right < this.myBoard[0].length) {
            const emptyRow = this.giveFirstEmpty(right);
            if (emptyRow !== null) {
              this.myBoard[emptyRow][right] = 2;
              this.lastMove = { row: emptyRow, col: right };
              return true;
            }
          }
          const left = col - 1;
          if (left >= 0) {
            const emptyRow = this.giveFirstEmpty(left);
            if (emptyRow !== null) {
              this.myBoard[emptyRow][left] = 2;
              this.lastMove = { row: emptyRow, col: left };
              return true;
            }
          }
        }

        // VERTICALE
        if (this.checkVertical(row, col, 2) >= 3) {
          const below = row + 1;
          if (below < this.myBoard.length && this.myBoard[below][col] === 0) {
            this.myBoard[below][col] = 2;
            this.lastMove = { row: below, col: col };
            return true;
          }
        }

        // DIAGONALE UP-LEFT
        if (this.checkDiagonaleUpLeft(row, col, 2) >= 3) {
          const targetCol = col + 1;
          const targetRow = row + 1;
          if (
            targetCol < this.myBoard[0].length &&
            targetRow < this.myBoard.length &&
            this.myBoard[targetRow][targetCol] === 0
          ) {
            this.myBoard[targetRow][targetCol] = 2;
            this.lastMove = { row: targetRow, col: targetCol };
            return true;
          }
        }

        // DIAGONALE UP-RIGHT
        if (this.checkDiagonaleUpRight(row, col, 2) >= 3) {
          const targetCol = col - 1;
          const targetRow = row + 1;
          if (
            targetCol >= 0 &&
            targetRow < this.myBoard.length &&
            this.myBoard[targetRow][targetCol] === 0
          ) {
            this.myBoard[targetRow][targetCol] = 2;
            this.lastMove = { row: targetRow, col: targetCol };
            return true;
          }
        }
      }
    }
    return false;
  }

  randomComputerMove() {
    const col = Math.floor(Math.random() * this.myBoard[0].length);
    const row = this.giveFirstEmpty(col);
    if (row !== null) {
      this.myBoard[row][col] = 2;
      this.lastMove = { row, col };
    }
  }
  start() {
    this.restart();
  }
}
