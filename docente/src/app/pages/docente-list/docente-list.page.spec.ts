import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteListPage } from './docente-list.page';

describe('DocenteListPage', () => {
  let component: DocenteListPage;
  let fixture: ComponentFixture<DocenteListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
