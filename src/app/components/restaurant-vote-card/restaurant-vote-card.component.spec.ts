import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantVoteCardComponent } from './restaurant-vote-card.component';

describe('RestaurantVoteCardComponent', () => {
  let component: RestaurantVoteCardComponent;
  let fixture: ComponentFixture<RestaurantVoteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantVoteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantVoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
