import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameMasterService } from 'src/app/services/game-master.service';

import { GuiComponent } from './gui.component';

describe('GuiComponent', () => {
  let component: GuiComponent;
  let service: GameMasterService;
  let fixture: ComponentFixture<GuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuiComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();
    service = TestBed.inject(GameMasterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handleRestart should restart the game', ()=>{
    service.newGame('easy');
    service.shoot('A1');
    let oldCoordinate = service.coordinates[0][0];
    component.handleRestart();
    let newCoordinate = service.coordinates[0][0];

    expect(newCoordinate).not.toEqual(oldCoordinate);
  })
});
