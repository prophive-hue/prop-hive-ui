import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { DeveloperService } from '../services/developer.service';
import { AuthService } from '../../auth/services/auth.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-developer-submit',
  imports: [CommonModule, ReactiveFormsModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './developer-submit.component.html',
  styleUrl: './developer-submit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperSubmitComponent extends SmartComponent {

  form: FormGroup;
  private userId: string = '';

  constructor(
    private fb: FormBuilder,
    private developerService: DeveloperService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
    }

    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      developer: ['', Validators.required],
      expectedRoi: [0, [Validators.required, Validators.min(0)]],
      totalInvestment: [0, [Validators.required, Validators.min(1)]],
      status: ['', Validators.required]
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.setLoading(true);
    this.developerService.submitProperty(this.userId, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.setLoading(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Submitted',
            detail: response.message,
            key: 'tl',
            life: 5000
          });
          this.router.navigate(['/developer/properties']);
        },
        error: (error) => this.handleError(error)
      });
  }

  cancel() {
    this.router.navigate(['/developer/properties']);
  }
}
