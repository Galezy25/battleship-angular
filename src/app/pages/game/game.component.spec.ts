import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';

import { BoardComponent } from 'src/app/components/board/board.component';
import { GuiComponent } from 'src/app/components/gui/gui.component';
import { TimesPipe } from 'src/app/pipes/times.pipe';
import { GameMasterService } from 'src/app/services/game-master.service';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let serviceGameMaster: GameMasterService;
  let paramsMap$ = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent, BoardComponent, GuiComponent, TimesPipe],
      imports: [RouterTestingModule, FontAwesomeModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramsMap$.asObservable(),
            snapshot: { params: { mode: 'easy' } },
          },
        },
      ],
    }).compileComponents();
    serviceGameMaster = TestBed.inject(GameMasterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    paramsMap$.next({
      get: () => 'easy',
    });
    expect(component).toBeTruthy();
  });
});
