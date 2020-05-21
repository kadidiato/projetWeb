import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfDiaolgComponent} from './prof-diaolg.component';

describe('ProfDiaolgComponent', () => {
  let component: ProfDiaolgComponent;
  let fixture: ComponentFixture<ProfDiaolgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfDiaolgComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfDiaolgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
