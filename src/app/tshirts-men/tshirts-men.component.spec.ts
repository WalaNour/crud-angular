import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtsMenComponent } from './tshirts-men.component';

describe('TshirtsMenComponent', () => {
  let component: TshirtsMenComponent;
  let fixture: ComponentFixture<TshirtsMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TshirtsMenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtsMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
