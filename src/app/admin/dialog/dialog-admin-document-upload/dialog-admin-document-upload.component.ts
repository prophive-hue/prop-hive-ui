import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dialog-admin-document-upload',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-admin-document-upload.component.html',
  styleUrl: './dialog-admin-document-upload.component.css'
})
export class DialogAdminDocumentUploadComponent {
  previewUrl: string | ArrayBuffer | null = null;
  @Output() onClose = new EventEmitter<any>();
  visible = false;

  form: FormGroup;

  categories: { name: string; value: string }[] = [
    {
      name: "Property",
      value: "PROPERTY"
    },
    {
      name: "Investor",
      value: "INVESTOR"
    },
    {
      name: "Financial",
      value: "FINANCIAL"
    },
    {
      name: "Legal",
      value: "LEGAL"
    },
    {
      name: "Operational",
      value: "OPERATIONAL"
    },
  ];

  selectedFileBase64: string | null = null;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: ['PROPERTY', Validators.required],
      fileBase64: ['', Validators.required],
    });
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.onClose.emit(null);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string;
        this.form.patchValue({
          fileBase64: this.selectedFileBase64
        });
      };
      reader.readAsDataURL(file);
    }
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
