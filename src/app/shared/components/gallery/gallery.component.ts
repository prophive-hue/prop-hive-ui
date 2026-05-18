import {Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {GalleriaModule} from 'primeng/galleria';
import {DialogModule} from 'primeng/dialog';
import {NgIf} from '@angular/common';
import { PresentationComponent } from '../base/base.component';
import { TrackByFunctions } from '../../utils/track-by.functions';

@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, DialogModule, NgIf],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent extends PresentationComponent implements OnInit, OnChanges {
  @Input() imageUrls: any[] = [];

  trackByIndex = TrackByFunctions.trackByIndex;
  visible = false;
  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  show() {
    this.images = this.getData();
    this.visible = true;
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageUrls']) {
      this.images = this.getData();
    }
  }

  hide() {
    this.visible = false;
  }

  getData() {
    return this.imageUrls.map((imageUrl) => {
      return {
        itemImageSrc: imageUrl,
        thumbnailImageSrc: imageUrl,
        alt: 'Description for Image',
        title: 'Property Image'
      }
    });
  }
}
