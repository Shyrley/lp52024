import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguroFormPage } from './seguro-form.page';

describe('SeguroFormPage', () => {
  let component: SeguroFormPage;
  let fixture: ComponentFixture<SeguroFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
