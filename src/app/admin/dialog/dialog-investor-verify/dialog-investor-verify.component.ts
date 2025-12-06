import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-investor-verify',
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-investor-verify.component.html',
  styleUrl: './dialog-investor-verify.component.css'
})
export class DialogInvestorVerifyComponent {



  @Output() onClose = new EventEmitter<any>();
  visible = false;

  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      sendEmail: [false, Validators.required],
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
