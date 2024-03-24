import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteuniteComponent } from './noteunite.component';

describe('NoteuniteComponent', () => {
  let component: NoteuniteComponent;
  let fixture: ComponentFixture<NoteuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteuniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
