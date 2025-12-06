import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-search-button',
  imports: [
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css'
})
export class SearchButtonComponent {


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
