import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../services/auth.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { SecurityValidators } from '../../../shared/validators/security.validators';
import { environment } from '../../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends SmartComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
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

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  private initGoogleSignIn(): void {
    if (typeof google === 'undefined') {
      // Retry after script loads
      setTimeout(() => this.initGoogleSignIn(), 100);
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleGoogleResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', width: '100%', text: 'signin_with' }
    );
  }

  private handleGoogleResponse(response: any): void {
    this.ngZone.run(() => {
      this.setLoading(true);
      this.authService.googleLogin(response.credential)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.setLoading(false);
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            this.handleError(error);
          }
        });
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
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }
}