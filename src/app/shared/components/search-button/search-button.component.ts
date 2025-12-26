import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import { PresentationComponent } from '../base/base.component';

@Component({
  selector: 'app-search-button',
  imports: [
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchButtonComponent extends PresentationComponent {


  @Input() placeHolder: string = "";

  @Output() search = new EventEmitter<string>();

  searchTimeout!: ReturnType<typeof setTimeout>;


  onSearchInput(event: Event): void {
    clearTimeout(this.searchTimeout);

    const input = event.target as HTMLInputElement;
    const value = input.value;



    this.searchTimeout = setTimeout(() => {
      console.log('Search after delay:', value);
      this.search.emit(value);
    }, 500);
  }

}
