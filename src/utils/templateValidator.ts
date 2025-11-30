/**
 * Template Validation Utilities
 * Validates vulnerability templates against required schema
 */

import type { VulnerabilityTemplate } from '../types/vulnerability';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates a vulnerability template against required fields
 * Requirements: 6.2, 6.3
 */
export function validateTemplate(template: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields
  if (!template.id || typeof template.id !== 'string') {
    errors.push({ field: 'id', message: 'id is required and must be a string' });
  }

  if (!template.owaspCategory || typeof template.owaspCategory !== 'string') {
    errors.push({ field: 'owaspCategory', message: 'owaspCategory is required and must be a string' });
  }

  if (!template.type || typeof template.type !== 'string') {
    errors.push({ field: 'type', message: 'type is required and must be a string' });
  }

  if (!template.name || typeof template.name !== 'string') {
    errors.push({ field: 'name', message: 'name is required and must be a string' });
  }

  if (!template.codePattern || typeof template.codePattern !== 'object') {
    errors.push({ field: 'codePattern', message: 'codePattern is required and must be an object' });
  } else {
    if (!template.codePattern.vulnerablePattern) {
      errors.push({ field: 'codePattern.vulnerablePattern', message: 'vulnerablePattern is required' });
    }
    if (!template.codePattern.fixPattern) {
      errors.push({ field: 'codePattern.fixPattern', message: 'fixPattern is required' });
    }
  }

  // AWS services validation (Requirements 11.1, 11.4)
  if (!template.educationalContent || typeof template.educationalContent !== 'object') {
    errors.push({ field: 'educationalContent', message: 'educationalContent is required' });
  } else {
    if (!Array.isArray(template.educationalContent.awsServices)) {
      errors.push({ field: 'educationalContent.awsServices', message: 'awsServices must be an array' });
    } else if (template.educationalContent.awsServices.length === 0) {
      errors.push({ field: 'educationalContent.awsServices', message: 'At least one AWS service is required' });
    } else {
      // Validate each AWS service
      template.educationalContent.awsServices.forEach((service: any, index: number) => {
        if (!service.name) {
          errors.push({ field: `educationalContent.awsServices[${index}].name`, message: 'AWS service name is required' });
        }
        if (!service.description) {
          errors.push({ field: `educationalContent.awsServices[${index}].description`, message: 'AWS service description is required' });
        }
        if (!service.useCase) {
          errors.push({ field: `educationalContent.awsServices[${index}].useCase`, message: 'AWS service useCase is required' });
        }
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates multiple templates and returns only valid ones
 */
export function validateTemplates(templates: any[]): {
  valid: VulnerabilityTemplate[];
  invalid: Array<{ template: any; errors: ValidationError[] }>;
} {
  const valid: VulnerabilityTemplate[] = [];
  const invalid: Array<{ template: any; errors: ValidationError[] }> = [];

  templates.forEach(template => {
    const result = validateTemplate(template);
    if (result.valid) {
      valid.push(template as VulnerabilityTemplate);
    } else {
      invalid.push({ template, errors: result.errors });
    }
  });

  return { valid, invalid };
}
