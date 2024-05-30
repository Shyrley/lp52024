import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteFormPage } from './docente-form.page';

describe('DocenteFormPage', () => {
  let component: DocenteFormPage;
  let fixture: ComponentFixture<DocenteFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
