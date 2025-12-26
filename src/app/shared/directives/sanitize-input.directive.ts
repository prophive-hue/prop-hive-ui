import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SanitizationService } from '../../core/services/sanitization.service';

@Directive({
  selector: '[appSanitizeInput]',
  standalone: true
})
export class SanitizeInputDirective {
  @Input() sanitizeOptions: {
    allowHtml?: boolean;
    maxLength?: number;
    alphanumericOnly?: boolean;
    type?: 'email' | 'phone' | 'filename' | 'general';
  } = {};

  private sanitizationService = inject(SanitizationService);
  private ngControl = inject(NgControl, { optional: true });
  private el = inject(ElementRef);

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!value) return;

    let sanitizedValue = value;

    switch (this.sanitizeOptions.type) {
      case 'email':
        sanitizedValue = this.sanitizationService.sanitizeEmail(value);
        break;
      case 'phone':
        sanitizedValue = this.sanitizationService.sanitizePhone(value);
        break;
      case 'filename':
        sanitizedValue = this.sanitizationService.sanitizeFilename(value);
        break;
      default:
        sanitizedValue = this.sanitizationService.sanitizeInput(value, this.sanitizeOptions);
    }

    if (sanitizedValue !== value) {
      input.value = sanitizedValue;
      
      // Update form control if available
      if (this.ngControl?.control) {
        this.ngControl.control.setValue(sanitizedValue);
      }

      // Dispatch input event to trigger change detection
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    
    const pastedText = event.clipboardData?.getData('text') || '';
    let sanitizedText = pastedText;

    switch (this.sanitizeOptions.type) {
      case 'email':
        sanitizedText = this.sanitizationService.sanitizeEmail(pastedText);
        break;
      case 'phone':
        sanitizedText = this.sanitizationService.sanitizePhone(pastedText);
        break;
      case 'filename':
        sanitizedText = this.sanitizationService.sanitizeFilename(pastedText);
        break;
      default:
        sanitizedText = this.sanitizationService.sanitizeInput(pastedText, this.sanitizeOptions);
    }

    const input = this.el.nativeElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = input.value;

    const newValue = currentValue.substring(0, start) + sanitizedText + currentValue.substring(end);
    input.value = newValue;

    // Update form control
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(newValue);
    }

    // Set cursor position
    const newCursorPos = start + sanitizedText.length;
    input.setSelectionRange(newCursorPos, newCursorPos);

    // Dispatch input event
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}