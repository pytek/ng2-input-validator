import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2InputValidatorComponent } from './ng2-input-validator.component';

describe('Ng2InputValidatorComponent', () => {
  let component: Ng2InputValidatorComponent;
  let fixture: ComponentFixture<Ng2InputValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2InputValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2InputValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
