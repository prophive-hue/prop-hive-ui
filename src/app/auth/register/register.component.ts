import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    this.errorMessage = '';
    console.log('Form submitted:', this.registerForm.value);
    
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    
    this.loading = true;
    
    const registerData: RegisterRequest = {
      name: this.registerForm.value.name.trim(),
      surname: this.registerForm.value.surname.trim(),
      email: this.registerForm.value.email.trim(),
      phone: this.registerForm.value.phone.trim(),
      password: this.registerForm.value.password.trim()
    };
    
    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.loading = false;
        // Navigate to login page after registration
        this.router.navigate(['/auth/login']);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }
}
