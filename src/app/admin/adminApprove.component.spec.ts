import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveComponent } from './adminApprove.component';

describe('AdminComponent', () => {
  let component: AdminApproveComponent;
  let fixture: ComponentFixture<AdminApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
