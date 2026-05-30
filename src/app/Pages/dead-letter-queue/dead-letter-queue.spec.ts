import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadLetterQueue } from './dead-letter-queue';

describe('DeadLetterQueue', () => {
  let component: DeadLetterQueue;
  let fixture: ComponentFixture<DeadLetterQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeadLetterQueue],
    }).compileComponents();

    fixture = TestBed.createComponent(DeadLetterQueue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
