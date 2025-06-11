import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinnerCardComponent } from './dinner-card.component';

describe('DinnerCardComponent', () => {
  let component: DinnerCardComponent;
  let fixture: ComponentFixture<DinnerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinnerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
