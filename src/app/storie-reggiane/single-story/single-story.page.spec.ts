import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleStoryPage } from './single-story.page';

describe('SingleStoryPage', () => {
  let component: SingleStoryPage;
  let fixture: ComponentFixture<SingleStoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
