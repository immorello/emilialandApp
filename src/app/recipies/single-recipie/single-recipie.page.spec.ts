import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleRecipiePage } from './single-recipie.page';

describe('SingleRecipiePage', () => {
  let component: SingleRecipiePage;
  let fixture: ComponentFixture<SingleRecipiePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRecipiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
