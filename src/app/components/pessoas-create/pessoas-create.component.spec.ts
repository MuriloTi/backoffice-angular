import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasCreateComponent } from './pessoas-create.component';

describe('PessoasCreateComponent', () => {
  let component: PessoasCreateComponent;
  let fixture: ComponentFixture<PessoasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoasCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
