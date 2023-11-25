import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotematiereComponent } from './notematiere.component';

describe('NotematiereComponent', () => {
  let component: NotematiereComponent;
  let fixture: ComponentFixture<NotematiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotematiereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotematiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
