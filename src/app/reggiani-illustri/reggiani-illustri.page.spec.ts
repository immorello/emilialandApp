import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReggianiIllustriPage } from './reggiani-illustri.page';

describe('ReggianiIllustriPage', () => {
  let component: ReggianiIllustriPage;
  let fixture: ComponentFixture<ReggianiIllustriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReggianiIllustriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
