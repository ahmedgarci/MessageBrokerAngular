import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Queues } from './queues';

describe('Queues', () => {
  let component: Queues;
  let fixture: ComponentFixture<Queues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Queues],
    }).compileComponents();

    fixture = TestBed.createComponent(Queues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
