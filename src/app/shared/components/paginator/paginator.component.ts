import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {Paginator} from 'primeng/paginator';
import { PresentationComponent } from '../base/base.component';

@Component({
  selector: 'app-paginator',
  imports: [
    Paginator
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent extends PresentationComponent {

  @Output() pagination = new EventEmitter<any>();

  @Input() totalElements: number = 0;

  page:number = 0
  size:number = 5;

  onPageChange(event: any) {
    this.pagination.emit(event);
  }
}
