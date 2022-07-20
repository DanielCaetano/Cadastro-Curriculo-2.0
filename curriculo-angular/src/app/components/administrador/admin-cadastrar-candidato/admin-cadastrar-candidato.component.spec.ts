import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCadastrarCandidatoComponent } from './admin-cadastrar-candidato.component';

describe('AdminCadastrarCandidatoComponent', () => {
  let component: AdminCadastrarCandidatoComponent;
  let fixture: ComponentFixture<AdminCadastrarCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCadastrarCandidatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCadastrarCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
