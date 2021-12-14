import { Component, OnInit } from '@angular/core';

import { LocalDBService, Score } from 'src/app/services/local-db.service';

@Component({
  selector: 'app-scores',
  template: `
    <div class="card">
      <ul>
        <li *ngFor="let score of scores">
          <p><b>Score: </b> {{ score.score }}</p>
          <p><b>Date: </b> {{ score.date.toLocaleString() }}</p>
        </li>
      </ul>
      <hr />
      <a routerLink="/menu"
        ><button class="w-100"><h2>Main menu</h2></button></a
      >
    </div>
  `,
  styles: [
    `
      li {
        border-radius: 5px;
        background-color: var(--cg-blue);
        border: 1px solid var(--prussian-blue);
        width: 100%;
        color: #eee;
        padding: 0.4em;
        display: inline-block;
        font-size: large;
      }
    `,
    `
      li:hover {
        background-color: var(--medium-electric-blue);
      }
    `,
  ],
})
export class ScoresComponent implements OnInit {
  scores: Score[] = [];

  constructor(private db: LocalDBService) {}

  ngOnInit(): void {
    this.db.scores
      .orderBy('score')
      .limit(10)
      .toArray()
      .then((scores) => {
        this.scores = scores;
      });
  }
}
