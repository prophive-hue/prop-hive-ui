import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SecurityValidators {
  
  // Password strength validator
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const minLength = value.length >= 8;

      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && minLength;
      
      if (!valid) {
        return {
          strongPassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasSpecial,
            minLength
          }
        };
      }
      return null;
    };
  }

  // No SQL injection patterns
  static noSqlInjection(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|TRUNCATE|MERGE|GRANT|REVOKE)\b)/i,
        /(--|\/#|\*#|\/\*|\*\/|;|'|"|`|\\x|\\u|%27|%22)/,
        /(\bOR\b|\bAND\b).*(=|<|>|LIKE|IN|EXISTS)/i,
        /(UNION\s+(ALL\s+)?SELECT)/i,
        /(\b(WAITFOR|DELAY|BENCHMARK|SLEEP)\b)/i,
        /(\b(INFORMATION_SCHEMA|SYS\.|DUAL)\b)/i,
        /(\b(CONCAT|CHAR|ASCII|SUBSTRING|LENGTH)\s*\()/i
      ];

      const hasSqlInjection = sqlPatterns.some(pattern => pattern.test(value));
      return hasSqlInjection ? { sqlInjection: true } : null;
    };
  }

  // No XSS patterns
  static noXss(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /data:\s*text\/html/gi,
        /vbscript:/gi,
        /expression\s*\(/gi,
        /<(svg|math|form|input|textarea|select|button)\b/gi,
        /&#x?[0-9a-f]+;?/gi,
        /%3c|%3e|%22|%27|%2f/gi,
        /<\w+[^>]*\s(src|href|action)\s*=\s*["']?\s*(javascript|data|vbscript):/gi
      ];

      const hasXss = xssPatterns.some(pattern => pattern.test(value));
      return hasXss ? { xss: true } : null;
    };
  }

  // Sanitize HTML input
  static noHtml(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const htmlPattern = /<[^>]*>/g;
      return htmlPattern.test(value) ? { html: true } : null;
    };
  }

  // Phone number validation
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
      return phonePattern.test(value.replace(/\s/g, '')) ? null : { phoneNumber: true };
    };
  }

  // File type validation
  static allowedFileTypes(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file) return null;

      const fileName = typeof file === 'string' ? file : file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      
      if (!fileExtension || !allowedTypes.includes(`.${fileExtension}`)) {
        return { fileType: { allowedTypes, actual: fileExtension } };
      }
      return null;
    };
  }

  // File size validation (in bytes)
  static maxFileSize(maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file || typeof file === 'string') return null;

      if (file.size > maxSize) {
        return { fileSize: { maxSize, actual: file.size } };
      }
      return null;
    };
  }

  // Alphanumeric only
  static alphanumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
      return alphanumericPattern.test(value) ? null : { alphanumeric: true };
    };
  }

  // No leading/trailing whitespace
  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      if (value !== value.trim()) {
        return { whitespace: true };
      }
      return null;
    };
  }
}