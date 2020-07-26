import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColorDialogComponent } from './delete-color-dialog.component';

describe('DeleteColorDialogComponent', () => {
  let component: DeleteColorDialogComponent;
  let fixture: ComponentFixture<DeleteColorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteColorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
