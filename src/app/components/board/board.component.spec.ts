import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimesPipe } from 'src/app/pipes/times.pipe';
import { GameMasterService } from 'src/app/services/game-master.service';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let service: GameMasterService;
  let fixture: ComponentFixture<BoardComponent>;
  let coordinate: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, TimesPipe],
      imports: [FontAwesomeModule],
    }).compileComponents();
    service = TestBed.inject(GameMasterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coordinate = fixture.nativeElement.querySelector('#A1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handleClickCoordinate should change coordinate button', () => {
    service.newGame('easy');
    component.handleClickCoordinate('A1');
    fixture.detectChanges();
    expect(coordinate.className).not.toContain('status-0');
  });

  it('Should be accessible all coordinate status', () => {
    for (let index = -1; index <= 8; index++) {
      component.coordinates[0][0].status = index;
      component.coordinates = [...component.coordinates];
      fixture.detectChanges();
      expect(coordinate.className).toContain('status-' + index);
    }
  });
});
