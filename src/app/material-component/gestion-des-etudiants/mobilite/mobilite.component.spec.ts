import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiliteComponent } from './mobilite.component';

describe('MobiliteComponent', () => {
  let component: MobiliteComponent;
  let fixture: ComponentFixture<MobiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
