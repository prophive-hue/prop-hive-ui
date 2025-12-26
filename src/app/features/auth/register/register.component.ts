import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../services/auth.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { SecurityValidators } from '../../../shared/validators/security.validators';
import { SanitizeInputDirective } from '../../../shared/directives/sanitize-input.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends SmartComponent {
  registerForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    this.registerForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        SecurityValidators.alphanumeric(),
        SecurityValidators.noXss(),
        SecurityValidators.noWhitespace()
      ]],
      surname: ['', [
        Validators.required,
        SecurityValidators.alphanumeric(),
        SecurityValidators.noXss(),
        SecurityValidators.noWhitespace()
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        SecurityValidators.noXss(),
        SecurityValidators.noSqlInjection()
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
        SecurityValidators.noXss()
      ]],
      password: ['', [
        Validators.required,
        SecurityValidators.strongPassword(),
        SecurityValidators.noXss()
      ]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }
  
  // Custom validator to check if passwords match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.clearError();
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.setLoading(true);
    
    const registerData: RegisterRequest = {
      name: this.registerForm.value.name.trim(),
      surname: this.registerForm.value.surname.trim(),
      email: this.registerForm.value.email.trim().toLowerCase(),
      phone: this.registerForm.value.phone.replace(/\s/g, ''),
      password: this.registerForm.value.password
    };
    
    this.authService.register(registerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.setLoading(false);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.handleError(error);
        }
      });
  }
}
