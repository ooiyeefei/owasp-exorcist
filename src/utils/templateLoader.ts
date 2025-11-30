/**
 * Template Loader
 * Loads and validates vulnerability templates from JSON files
 */

import type { VulnerabilityTemplate } from '../types/vulnerability';
import { validateTemplates } from './templateValidator';

// Import all templates
import hardcodedSecret from '../../.kiro/templates/vulnerabilities/hardcoded-secret.json';
import xssDangerousHtml from '../../.kiro/templates/vulnerabilities/xss-dangerous-html.json';
import codeInjectionEval from '../../.kiro/templates/vulnerabilities/code-injection-eval.json';
import sqlInjection from '../../.kiro/templates/vulnerabilities/sql-injection.json';
import idor from '../../.kiro/templates/vulnerabilities/idor.json';
import missingValidation from '../../.kiro/templates/vulnerabilities/missing-validation.json';
import insecureDeserialization from '../../.kiro/templates/vulnerabilities/insecure-deserialization.json';
import insufficientLogging from '../../.kiro/templates/vulnerabilities/insufficient-logging.json';

const allTemplates = [
  hardcodedSecret,
  xssDangerousHtml,
  codeInjectionEval,
  sqlInjection,
  idor,
  missingValidation,
  insecureDeserialization,
  insufficientLogging,
];

/**
 * Load all vulnerability templates and validate them
 * Requirements: 1.2, 6.2, 6.3
 */
export function loadTemplates(): {
  templates: VulnerabilityTemplate[];
  errors: Array<{ templateId: string; errors: any[] }>;
} {
  const { valid, invalid } = validateTemplates(allTemplates);

  // Log errors for invalid templates
  const errors = invalid.map(({ template, errors }) => ({
    templateId: template.id || 'unknown',
    errors,
  }));

  if (errors.length > 0) {
    console.error('Invalid templates found:', errors);
  }

  return {
    templates: valid,
    errors,
  };
}

/**
 * Get templates by OWASP category
 */
export function getTemplatesByCategory(category: string): VulnerabilityTemplate[] {
  const { templates } = loadTemplates();
  return templates.filter(t => t.owaspCategory === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): VulnerabilityTemplate | undefined {
  const { templates } = loadTemplates();
  return templates.find(t => t.id === id);
}

/**
 * Get template by type
 */
export function getTemplateByType(type: string): VulnerabilityTemplate | undefined {
  const { templates } = loadTemplates();
  return templates.find(t => t.type === type);
}

/**
 * Get all unique OWASP categories from templates
 * Requirements: 1.2
 */
export function getUniqueOwaspCategories(): string[] {
  const { templates } = loadTemplates();
  return [...new Set(templates.map(t => t.owaspCategory))];
}
