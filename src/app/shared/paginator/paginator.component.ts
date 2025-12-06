import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Paginator} from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  imports: [
    Paginator
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Output() pagination = new EventEmitter<any>();

  @Input() totalElements: number = 0;

  page:number = 0
  size:number = 5;

  onPageChange(event: any) {
    this.pagination.emit(event);
  }
}
