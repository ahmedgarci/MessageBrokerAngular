import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExchangeComp } from './create-exchange-comp';

describe('CreateExchangeComp', () => {
  let component: CreateExchangeComp;
  let fixture: ComponentFixture<CreateExchangeComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExchangeComp],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExchangeComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
