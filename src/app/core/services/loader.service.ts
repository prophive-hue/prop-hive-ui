import { Injectable, inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private ngxLoader = inject(NgxUiLoaderService);

  startLoader() {
    this.ngxLoader.startLoader('loader');
  }

  stopLoader() {

    this.ngxLoader.stopLoader('loader');
  }
}
