import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <h1>Battleship!</h1>
    <div class="card">
      <h2>Choose a game mode</h2>
      <ul>
        <li>
          <a routerLink="/game/easy"
            ><button class="w-100"><h2>Easy mode</h2></button></a
          >
        </li>
        <li>
          <a routerLink="/game/medium"
            ><button class="w-100"><h2>Medium mode</h2></button></a
          >
        </li>
        <li>
          <a routerLink="/game/hard"
            ><button class="w-100"><h2>Hard mode</h2></button></a
          >
        </li>
        <li>
          <input
            [(ngModel)]="customTurns"
            type="number"
            placeholder="Custom turns"
            name="customTurns"
            min="20"
            max="100"
            title="Number of turns"
          />
          <a [routerLink]="'/game/' + customTurns"
            ><button><h2>Custom mode</h2></button></a
          >
        </li>
      </ul>
      <hr />
      <a routerLink="/scores"
        ><button class="w-100"><h2>Your ranking score</h2></button></a
      >
    </div>
  `,
  styles: [
    `
      input {
        background-color: var(--cg-blue);
        border: 1px solid var(--medium-electric-blue);
        border-radius: 10px;
        font-size: x-large;
        color: #eee;
        font-weight: bold;
        padding: 0.2em;
        margin: 0.2em;
      }
    `,
    `
      h1 {
        color: #eee;
        font-weight: bold;
        margin: 1em auto 0.2em auto;
        width: fit-content;
      }
    `,
  ],
})
export class MenuComponent {
  customTurns: number = 75;
}
