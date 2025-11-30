/**
 * Template Validator Tests
 * Test-driven development for template validation
 */

import { describe, it, expect } from 'vitest';
import { validateTemplate, validateTemplates } from './templateValidator';
import type { VulnerabilityTemplate } from '../types/vulnerability';

describe('templateValidator', () => {
  describe('validateTemplate', () => {
    it('should validate a complete valid template', () => {
      const validTemplate: VulnerabilityTemplate = {
        id: 'hardcoded-secret-v1',
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        name: 'Hardcoded API Key',
        description: 'API keys in source code',
        severity: 'high',
        difficultyRange: { min: 1, max: 5 },
        codePattern: {
          vulnerablePattern: 'const API_KEY = "sk-..."',
          fixPattern: 'const API_KEY = import.meta.env.VITE_API_KEY'
        },
        hints: {
          easy: ['Look for hardcoded strings'],
          hard: ['Check configuration values']
        },
        educationalContent: {
          analogy: 'Like leaving keys under doormat',
          realWorldImpact: 'Uber paid $148M in fines',
          preventionTip: 'Use environment variables',
          awsServices: [
            {
              name: 'AWS Secrets Manager',
              description: 'Securely store and rotate secrets',
              useCase: 'Store API keys and database credentials',
              documentationUrl: 'https://aws.amazon.com/secrets-manager/'
            }
          ]
        }
      };

      const result = validateTemplate(validTemplate);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject template missing id', () => {
      const template = {
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        name: 'Test',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'id')).toBe(true);
    });

    it('should reject template missing owaspCategory', () => {
      const template = {
        id: 'test',
        type: 'hardcoded-secret',
        name: 'Test',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'owaspCategory')).toBe(true);
    });

    it('should reject template missing type', () => {
      const template = {
        id: 'test',
        owaspCategory: 'A02:2021',
        name: 'Test',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'type')).toBe(true);
    });

    it('should reject template missing name', () => {
      const template = {
        id: 'test',
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'name')).toBe(true);
    });

    it('should reject template missing codePattern', () => {
      const template = {
        id: 'test',
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        name: 'Test',
        educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'codePattern')).toBe(true);
    });

    it('should reject template with empty AWS services array', () => {
      const template = {
        id: 'test',
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        name: 'Test',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: { awsServices: [] }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field === 'educationalContent.awsServices')).toBe(true);
    });

    it('should reject template with AWS service missing name', () => {
      const template = {
        id: 'test',
        owaspCategory: 'A02:2021',
        type: 'hardcoded-secret',
        name: 'Test',
        codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
        educationalContent: {
          awsServices: [{ description: 'Test', useCase: 'Test' }]
        }
      };

      const result = validateTemplate(template);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.field.includes('awsServices[0].name'))).toBe(true);
    });
  });

  describe('validateTemplates', () => {
    it('should separate valid and invalid templates', () => {
      const templates = [
        {
          id: 'valid-1',
          owaspCategory: 'A02:2021',
          type: 'test',
          name: 'Valid',
          codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
          educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
        },
        {
          id: 'invalid-1',
          // missing required fields
        },
        {
          id: 'valid-2',
          owaspCategory: 'A03:2021',
          type: 'test2',
          name: 'Valid 2',
          codePattern: { vulnerablePattern: 'test', fixPattern: 'test' },
          educationalContent: { awsServices: [{ name: 'Test', description: 'Test', useCase: 'Test' }] }
        }
      ];

      const result = validateTemplates(templates);
      expect(result.valid).toHaveLength(2);
      expect(result.invalid).toHaveLength(1);
    });
  });
});
