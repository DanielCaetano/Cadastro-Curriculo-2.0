import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoBuscarComponent } from './candidato-buscar.component';

describe('CandidatoBuscarComponent', () => {
  let component: CandidatoBuscarComponent;
  let fixture: ComponentFixture<CandidatoBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoBuscarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
