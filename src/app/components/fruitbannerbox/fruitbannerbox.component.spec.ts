import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitbannerboxComponent } from './fruitbannerbox.component';

describe('FruitbannerboxComponent', () => {
  let component: FruitbannerboxComponent;
  let fixture: ComponentFixture<FruitbannerboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitbannerboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitbannerboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
