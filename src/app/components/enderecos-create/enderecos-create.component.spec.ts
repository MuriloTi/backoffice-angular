import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosCreateComponent } from './enderecos-create.component';

describe('EnderecosCreateComponent', () => {
  let component: EnderecosCreateComponent;
  let fixture: ComponentFixture<EnderecosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
