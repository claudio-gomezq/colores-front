import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColorDialogComponent } from './create-color-dialog.component';

describe('CreateColorDialogComponent', () => {
  let component: CreateColorDialogComponent;
  let fixture: ComponentFixture<CreateColorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateColorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
