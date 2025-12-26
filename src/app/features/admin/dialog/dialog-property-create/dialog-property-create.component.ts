import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {SelectModule} from 'primeng/select';

@Component({
  selector: 'app-resource-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './dialog-property-create.component.html',
  styleUrl: './dialog-property-create.component.css'
})
export class DialogPropertyCreateComponent {
  @Output() onClose = new EventEmitter<any>();
  visible = false;

  form: FormGroup;

  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      developer: [''],
      expectedRoi: ['', Validators.required],
      totalInvestment: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.onClose.emit(null);
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        images: this.imagePreviews
      };

      this.onClose.emit(payload);
      this.visible = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    input.value = '';
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

}
