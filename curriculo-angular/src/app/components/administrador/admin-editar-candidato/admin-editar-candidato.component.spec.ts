import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarCandidatoComponent } from './admin-editar-candidato.component';

describe('AdminEditarCandidatoComponent', () => {
  let component: AdminEditarCandidatoComponent;
  let fixture: ComponentFixture<AdminEditarCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditarCandidatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditarCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
