import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMobiliteComponent } from './gestion-mobilite.component';

describe('GestionMobiliteComponent', () => {
  let component: GestionMobiliteComponent;
  let fixture: ComponentFixture<GestionMobiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMobiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMobiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
