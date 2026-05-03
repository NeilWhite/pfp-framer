import { Component, effect, input, OnInit, signal, ViewChild } from '@angular/core';
import Konva from 'konva';
import { CoreShapeComponent, StageComponent, NgKonvaEventObject } from 'ng2-konva';
import { StageConfig } from 'konva/lib/Stage';
import { ImageConfig } from 'konva/lib/shapes/Image';

const imageSize = 512;

@Component({
  selector: 'app-frame-stage',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './frame-stage.component.html',
  styleUrl: './frame-stage.component.css'
})
export class FrameStageComponent {
  @ViewChild('stage') stage: StageComponent = null as any;
  
  frame = input.required<string>();
  
  constructor() {
    effect(() => {
      this.setFrame(this.frame());
    })
  }

  public configStage: StageConfig = {
    width: imageSize,
    height: imageSize
  }

  private scale = 1.0;
  private maxLength = 0;
  private image = new Image();

  public frameConfig = signal<ImageConfig>({
    width: imageSize,
    height: imageSize,
    image: null as any,
    listening: false
  })

  public imageConfig = signal<ImageConfig>({
    image: null as any,
    draggable: true,
  })

  public handleImageDrag(event: any): void {
    console.log(event)
  }

  public handleZoom(event: any): void{
    console.log(event.deltaY) 
    this.scale -= (Math.sign(event.deltaY) * 0.05);
    this.setScale(this.scale);
  }

  public onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    var files = event.dataTransfer?.files;
    if (files && files.length === 1 && files[0].type.startsWith("image/")) {
      this.setImage(files[0]);
    }
  }

  setScale(scale: number) {
    if (this.image && this.maxLength) {
      this.imageConfig.update((current) => ({
        ...current,
        width: this.image.width / this.maxLength * imageSize * scale,
        height: this.image.height / this.maxLength * imageSize * scale,
      }));
    }
  }

  setImage(file: File) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image.src = e.target?.result as string;
      }

      this.image.onload = () => this.imageConfig.update((current) => { 
        this.scale = 1.0;
        const image = this.image;
        const max = this.maxLength = Math.min(image.width, image.height);
        return {
          ...current,
          image,
          width: image.width / max * imageSize,
          height: image.height / max * imageSize
        }
      });

      reader.readAsDataURL(file);
    }
  }

  setFrame(frameUrl: string) {
    const image = new Image()
    image.onload = () => this.frameConfig.update((current) => ({
      ...current,
      image
    }));

    image.src = frameUrl;
  }

  save() {
    var stage = this.stage.getStage();

    const dataUrl = stage.toDataURL({ pixelRatio: 1 });
    const link = document.createElement('a');
    link.download = 'pfp-with-frame.png';
    link.href = dataUrl;
    link.target = '#';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
