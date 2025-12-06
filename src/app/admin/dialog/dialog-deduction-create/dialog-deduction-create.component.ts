import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {SelectModule} from 'primeng/select';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-dialog-deduction-create',
  imports: [

    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    SelectModule,
    DividerModule],
  templateUrl: './dialog-deduction-create.component.html',
  styleUrl: './dialog-deduction-create.component.css'
})
export class DialogDeductionCreateComponent {

  previewUrl: string | ArrayBuffer | null = null;
  @Output() onClose = new EventEmitter<any>();
  visible = false;

  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['PERCENTAGE', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
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



}
