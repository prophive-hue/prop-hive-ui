import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { AuthRepository } from '../../../core/api/repositories/auth.repository';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent extends SmartComponent {
  form: FormGroup;
  submitted = false;
  emailSent = false;

  constructor(private fb: FormBuilder, private authRepository: AuthRepository) {
    super();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.setLoading(true);
    this.authRepository.forgotPassword(this.form.value.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.setLoading(false);
          this.emailSent = true;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }
}
