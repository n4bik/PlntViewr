import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsContainerComponent } from './planets-container.component';

describe('PlanetsContainerComponent', () => {
  let component: PlanetsContainerComponent;
  let fixture: ComponentFixture<PlanetsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
