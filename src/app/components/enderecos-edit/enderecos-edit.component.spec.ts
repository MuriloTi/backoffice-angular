import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosEditComponent } from './enderecos-edit.component';

describe('EnderecosEditComponent', () => {
  let component: EnderecosEditComponent;
  let fixture: ComponentFixture<EnderecosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
