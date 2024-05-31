import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputadoraFormPage } from './computadora-form.page';

describe('ComputadoraFormPage', () => {
  let component: ComputadoraFormPage;
  let fixture: ComponentFixture<ComputadoraFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputadoraFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
