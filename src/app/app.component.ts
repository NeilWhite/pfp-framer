import { Component, effect, ElementRef, OnInit, signal, viewChild, ViewChild } from '@angular/core';
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
  selectedFrame = signal<any>(null as any);

  variant = viewChild<ElementRef>('variant');

  public selectFrame($event: MouseEvent, frame: string) {
    console.log($event, frame)
    this.selectedFrame.set($event.target);
  }

  ngAfterViewInit() {
      this.variant()?.nativeElement.querySelector('img')?.click();
  }
}
