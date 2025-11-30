/**
 * Template Loader Tests
 * Verify all templates load and validate correctly
 */

import { describe, it, expect } from 'vitest';
import { loadTemplates, getUniqueOwaspCategories, getTemplateById, getTemplateByType } from './templateLoader';

describe('templateLoader', () => {
  describe('loadTemplates', () => {
    it('should load all templates without errors', () => {
      const { templates, errors } = loadTemplates();
      
      expect(errors).toHaveLength(0);
      expect(templates.length).toBeGreaterThanOrEqual(8);
    });

    it('should have at least 5 distinct OWASP types (Requirement 1.2)', () => {
      const { templates } = loadTemplates();
      const types = new Set(templates.map(t => t.type));
      
      expect(types.size).toBeGreaterThanOrEqual(5);
    });

    it('should have all templates with AWS services (Requirements 11.1, 11.4)', () => {
      const { templates } = loadTemplates();
      
      templates.forEach(template => {
        expect(template.educationalContent.awsServices).toBeDefined();
        expect(template.educationalContent.awsServices.length).toBeGreaterThan(0);
        
        template.educationalContent.awsServices.forEach(service => {
          expect(service.name).toBeDefined();
          expect(service.description).toBeDefined();
          expect(service.useCase).toBeDefined();
        });
      });
    });

    it('should have all required fields for each template', () => {
      const { templates } = loadTemplates();
      
      templates.forEach(template => {
        expect(template.id).toBeDefined();
        expect(template.owaspCategory).toBeDefined();
        expect(template.type).toBeDefined();
        expect(template.name).toBeDefined();
        expect(template.codePattern).toBeDefined();
        expect(template.codePattern.vulnerablePattern).toBeDefined();
        expect(template.codePattern.fixPattern).toBeDefined();
      });
    });
  });

  describe('getUniqueOwaspCategories', () => {
    it('should return unique OWASP categories', () => {
      const categories = getUniqueOwaspCategories();
      
      expect(categories.length).toBeGreaterThan(0);
      expect(new Set(categories).size).toBe(categories.length);
    });
  });

  describe('getTemplateById', () => {
    it('should find template by ID', () => {
      const template = getTemplateById('hardcoded-secret-v1');
      
      expect(template).toBeDefined();
      expect(template?.type).toBe('hardcoded-secret');
    });

    it('should return undefined for non-existent ID', () => {
      const template = getTemplateById('non-existent');
      
      expect(template).toBeUndefined();
    });
  });

  describe('getTemplateByType', () => {
    it('should find template by type', () => {
      const template = getTemplateByType('hardcoded-secret');
      
      expect(template).toBeDefined();
      expect(template?.id).toBe('hardcoded-secret-v1');
    });

    it('should return undefined for non-existent type', () => {
      const template = getTemplateByType('non-existent');
      
      expect(template).toBeUndefined();
    });
  });
});
