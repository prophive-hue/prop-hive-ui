import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  // HTML entities to escape
  private readonly htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  // Sanitize HTML content
  sanitizeHtml(input: string): string {
    if (!input) return '';
    
    return input.replace(/[&<>"'\/]/g, (match) => {
      return this.htmlEntities[match];
    });
  }

  // Remove all HTML tags
  stripHtml(input: string): string {
    if (!input) return '';
    return input.replace(/<[^>]*>/g, '');
  }

  // Sanitize for SQL (basic protection)
  sanitizeSql(input: string): string {
    if (!input) return '';
    
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }

  // Clean whitespace
  cleanWhitespace(input: string): string {
    if (!input) return '';
    return input.trim().replace(/\s+/g, ' ');
  }

  // Sanitize filename
  sanitizeFilename(filename: string): string {
    if (!filename) return '';
    
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
  }

  // Validate and sanitize email
  sanitizeEmail(email: string): string {
    if (!email) return '';
    
    return email
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9@._-]/g, '');
  }

  // Sanitize phone number
  sanitizePhone(phone: string): string {
    if (!phone) return '';
    return phone.replace(/[^0-9+\-\s()]/g, '');
  }

  // General input sanitization
  sanitizeInput(input: string, options: {
    allowHtml?: boolean;
    maxLength?: number;
    alphanumericOnly?: boolean;
  } = {}): string {
    if (!input) return '';

    let sanitized = input;

    // Remove HTML if not allowed
    if (!options.allowHtml) {
      sanitized = this.sanitizeHtml(sanitized);
    }

    // Alphanumeric only
    if (options.alphanumericOnly) {
      sanitized = sanitized.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    // Clean whitespace
    sanitized = this.cleanWhitespace(sanitized);

    // Truncate if max length specified
    if (options.maxLength && sanitized.length > options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength);
    }

    return sanitized;
  }
}