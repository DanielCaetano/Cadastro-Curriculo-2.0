import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuscarComponent } from './admin-buscar.component';

describe('AdminBuscarComponent', () => {
  let component: AdminBuscarComponent;
  let fixture: ComponentFixture<AdminBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBuscarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
