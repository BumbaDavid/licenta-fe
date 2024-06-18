import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvCardComponent } from './user-cv-card.component';

describe('UserCvCardComponent', () => {
  let component: UserCvCardComponent;
  let fixture: ComponentFixture<UserCvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCvCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
