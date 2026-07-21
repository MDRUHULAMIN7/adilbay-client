import fs from 'fs';
import path from 'path';

const IGNORED_PATHS = [
  'node_modules',
  '.next',
  'coverage',
  'scripts',
  'docs',
  'globals.css',
  'design-tokens.ts',
  'icons.ts',
];

const FORBIDDEN_PATTERNS = [
  /bg-white(?!-)/,
  /text-black(?!-)/,
  /text-white(?!-)/,
  /bg-black(?!-)/,
  /border-white(?!-)/,
  /border-black(?!-)/,
  /\b(bg|text|border|ring)-(gray|neutral|zinc|slate)-\d+/,
];

let violationsCount = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (IGNORED_PATHS.some((ignored) => fullPath.includes(ignored))) {
        continue;
      }
      walkDir(fullPath);
    } else {
      if (IGNORED_PATHS.some((ignored) => file === ignored || fullPath.includes(ignored))) {
        continue;
      }

      const ext = path.extname(file);
      if (['.ts', '.tsx'].includes(ext)) {
        checkFile(fullPath);
      }
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    FORBIDDEN_PATTERNS.forEach((pattern) => {
      if (pattern.test(line)) {
        // Exclude lines that are comments
        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
          return;
        }
        console.error(
          `Violation in ${filePath}:${index + 1}: Found forbidden hardcoded token "${line.trim()}"`
        );
        violationsCount++;
      }
    });
  });
}

console.log('Auditing semantic design tokens inside src/ directory...');
const srcPath = path.join(process.cwd(), 'src');
if (fs.existsSync(srcPath)) {
  walkDir(srcPath);
}

if (violationsCount > 0) {
  console.error(`Audit failed: Found ${violationsCount} violation(s).`);
  process.exit(1);
} else {
  console.log('Audit success: Zero hardcoded colors found!');
  process.exit(0);
}
