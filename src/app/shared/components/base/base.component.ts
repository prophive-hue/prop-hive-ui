import { Component, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { AppError, ErrorType, ErrorSeverity } from '../../../models';

/**
 * Base component providing common functionality for all components.
 * Handles subscription cleanup to prevent memory leaks.
 */
@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy {
  /** Subject for managing component subscriptions */
  protected destroy$ = new Subject<void>();

  /**
   * Cleanup subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Smart component base class for container components.
 * Provides data management, error handling, and loading state functionality.
 * 
 * @example
 * ```typescript
 * export class UserListComponent extends SmartComponent {
 *   users: User[] = [];
 * 
 *   loadUsers() {
 *     this.setLoading(true);
 *     this.userService.getUsers()
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe({
 *         next: users => {
 *           this.users = users;
 *           this.setLoading(false);
 *         },
 *         error: error => this.handleError(error)
 *       });
 *   }
 * }
 * ```
 */
@Component({ template: '' })
export abstract class SmartComponent extends BaseComponent {
  /** Loading state indicator */
  protected loading = false;
  
  /** Current error state */
  protected error: AppError | null = null;
  
  /** Error handling service */
  private errorHandler = inject(ErrorHandlerService);
  
  /** Change detector for OnPush components */
  protected cdr = inject(ChangeDetectorRef);

  /**
   * Set loading state and trigger change detection
   * @param loading - Loading state
   */
  protected setLoading(loading: boolean): void {
    this.loading = loading;
    this.cdr.markForCheck();
  }

  /**
   * Set error state and trigger change detection
   * @param error - Error message or AppError object
   */
  protected setError(error: string | AppError | null): void {
    if (typeof error === 'string') {
      this.error = {
        message: error,
        type: ErrorType.BUSINESS,
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        userFriendly: true
      };
    } else {
      this.error = error;
    }
    this.cdr.markForCheck();
  }

  /**
   * Handle errors with automatic loading state management
   * @param error - Error to handle
   */
  protected handleError(error: any): void {
    this.setLoading(false);
    
    if (error && typeof error === 'object' && 'type' in error) {
      // Already an AppError
      this.setError(error as AppError);
    } else {
      // Convert to AppError
      const appError: AppError = {
        message: error?.message || 'An unexpected error occurred',
        type: ErrorType.UNKNOWN,
        severity: ErrorSeverity.MEDIUM,
        timestamp: new Date(),
        userFriendly: true
      };
      this.setError(appError);
      this.errorHandler.displayError(appError);
    }
  }

  /**
   * Clear current error state
   */
  protected clearError(): void {
    this.error = null;
    this.cdr.markForCheck();
  }
}

/**
 * Presentation component base class for UI-only components.
 * Enforces no service injection or state management.
 * Should only handle UI rendering and Input/Output communication.
 * 
 * @example
 * ```typescript
 * export class UserCardComponent extends PresentationComponent {
 *   @Input() user: User;
 *   @Output() userClick = new EventEmitter<User>();
 * 
 *   onUserClick() {
 *     this.userClick.emit(this.user);
 *   }
 * }
 * ```
 */
@Component({ template: '' })
export abstract class PresentationComponent {
  // No state management or service injection allowed
}