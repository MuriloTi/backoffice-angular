import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosListComponent } from './departamentos-list.component';

describe('DepartamentosListComponent', () => {
  let component: DepartamentosListComponent;
  let fixture: ComponentFixture<DepartamentosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
