import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../services/auth.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { SecurityValidators } from '../../../shared/validators/security.validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends SmartComponent {
  loginForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        SecurityValidators.noXss(),
        SecurityValidators.noSqlInjection()
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        SecurityValidators.strongPassword(),
        SecurityValidators.noXss(),
        SecurityValidators.noSqlInjection()
      ]],
      rememberMe: [false]
    });
  }
  
  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.setError(null);
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.setLoading(true);
    
    const loginData: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    
    this.authService.login(loginData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.setLoading(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }
}