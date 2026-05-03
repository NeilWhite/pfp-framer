import { Component, signal } from '@angular/core';
import { FrameStageComponent } from './frame-stage/frame-stage.component';

const frames = [
  'UWOTC-CWA_pfp_frame_1.png',
  'UWOTC-CWA_pfp_frame_2.png'
]

@Component({
  selector: 'app-root',
  imports: [ FrameStageComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  frames = frames;
  selectedFrame = signal<string>(frames[0]);

  public selectFrame(frame: string) {
    console.log(frame)
    this.selectedFrame.set(frame);
  }
}
