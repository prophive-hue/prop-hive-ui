import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {SelectModule} from 'primeng/select';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-dialog-developer-create',
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    SelectModule,
    DividerModule
  ],
  templateUrl: './dialog-developer-create.component.html',
  styleUrl: './dialog-developer-create.component.css'
})
export class DialogDeveloperCreateComponent {

  previewUrl: string | ArrayBuffer | null = null;
  @Output() onClose = new EventEmitter<any>();
  visible = false;

  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyPhone: ['', Validators.required],
      companyType: [''],
      yearsExperience: [''],
      description: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userSurname: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPhone: ['', Validators.required],
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
    console.log(this.form)
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.onClose.emit(this.form.value);
      this.visible = false;
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
