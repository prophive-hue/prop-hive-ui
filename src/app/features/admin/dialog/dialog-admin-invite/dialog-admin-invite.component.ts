import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-admin-invite',
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-admin-invite.component.html',
  styleUrl: './dialog-admin-invite.component.css'
})
export class DialogAdminInviteComponent {

  @Output() onClose = new EventEmitter<any>();
  visible = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.form.reset();
    this.onClose.emit(null);
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.onClose.emit(this.form.value);
      this.visible = false;
      this.form.reset();
    }
  }
}
