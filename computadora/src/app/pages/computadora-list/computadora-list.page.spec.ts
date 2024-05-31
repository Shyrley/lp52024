import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputadoraListPage } from './computadora-list.page';

describe('ComputadoraListPage', () => {
  let component: ComputadoraListPage;
  let fixture: ComponentFixture<ComputadoraListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputadoraListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
