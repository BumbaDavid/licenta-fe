import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobOfferDialogComponent } from './edit-job-offer-dialog.component';

describe('EditJobOfferDialogComponent', () => {
  let component: EditJobOfferDialogComponent;
  let fixture: ComponentFixture<EditJobOfferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobOfferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
