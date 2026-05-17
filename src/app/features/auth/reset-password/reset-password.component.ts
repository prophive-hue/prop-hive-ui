import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { AuthRepository } from '../../../core/api/repositories/auth.repository';
import { SecurityValidators } from '../../../shared/validators/security.validators';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent extends SmartComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  resetSuccess = false;
  token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authRepository: AuthRepository
  ) {
    super();
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, SecurityValidators.strongPassword()]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.mustMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  get f() { return this.form.controls; }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) return;
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid || !this.token) return;

    this.setLoading(true);
    this.authRepository.resetPassword(this.token, this.form.value.newPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.setLoading(false);
          this.resetSuccess = true;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }
}
