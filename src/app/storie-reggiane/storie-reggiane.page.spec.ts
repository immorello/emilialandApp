import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorieReggianePage } from './storie-reggiane.page';

describe('StorieReggianePage', () => {
  let component: StorieReggianePage;
  let fixture: ComponentFixture<StorieReggianePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StorieReggianePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
