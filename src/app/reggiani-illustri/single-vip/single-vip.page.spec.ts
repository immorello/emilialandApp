import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleVipPage } from './single-vip.page';

describe('SingleVipPage', () => {
  let component: SingleVipPage;
  let fixture: ComponentFixture<SingleVipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
