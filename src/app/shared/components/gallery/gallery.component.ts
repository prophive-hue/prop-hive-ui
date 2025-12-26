import {Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import {GalleriaModule} from 'primeng/galleria';
import {DialogModule} from 'primeng/dialog';
import { NgOptimizedImage } from '@angular/common';
import { PresentationComponent } from '../base/base.component';
import { TrackByFunctions } from '../../utils/track-by.functions';

@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, DialogModule, NgOptimizedImage],
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

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('init modal');
  }

  show() {
    console.log('inside gallery component')
    console.log(this.imageUrls);
    console.log(this.imageUrls.length);
    this.images = this.getData();
    this.visible = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageUrls']) {
      console.log('imageUrls changed:', this.imageUrls);
      this.images = this.getData();
    }
  }

  hide() {
    this.visible = false;
  }

  getData() {
    console.log('inside getData');
    console.log(this.imageUrls);
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
