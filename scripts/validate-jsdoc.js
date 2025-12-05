#!/usr/bin/env node
/**
 * JSDoc Validation Script
 * Validates that all public exports have JSDoc documentation.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SRC_DIR = join(__dirname, '..', 'src');

function getFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (['.ts', '.vue'].includes(extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const issues = [];
  const relativePath = filePath.replace(SRC_DIR, 'src');

  // Check for @fileoverview
  if (!/@fileoverview/.test(content)) {
    issues.push(`Missing @fileoverview documentation`);
  }

  return { file: relativePath, issues };
}

function main() {
  console.log('🔍 Validating JSDoc documentation...\n');

  const files = getFiles(SRC_DIR);
  let totalIssues = 0;
  const results = [];

  for (const file of files) {
    const result = validateFile(file);
    if (result.issues.length > 0) {
      results.push(result);
      totalIssues += result.issues.length;
    }
  }

  if (results.length === 0) {
    console.log('✅ All files have proper JSDoc documentation!\n');
    process.exit(0);
  }

  console.log(`Found ${totalIssues} issues in ${results.length} files:\n`);
  for (const result of results) {
    console.log(`📄 ${result.file}`);
    result.issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
    console.log('');
  }

  process.exit(1);
}

main();
