import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameStageComponent } from './frame-stage.component';

describe('FrameStageComponent', () => {
  let component: FrameStageComponent;
  let fixture: ComponentFixture<FrameStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
