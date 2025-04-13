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

  constructor() {
  }

}
