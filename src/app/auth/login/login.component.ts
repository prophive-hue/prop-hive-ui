import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  
  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const loginData: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.loading = false;
        // Navigate to dashboard or home page after login
        this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }
}