import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const targetDirs = [
  path.join(rootDir, "src", "components"),
  path.join(rootDir, "src", "app"),
];

const forbiddenPatterns = [
  { pattern: /#[0-9a-fA-F]{3,8}\b/, name: "Hex color literal" },
  { pattern: /rgba?\s*\(/, name: "rgb()/rgba() function literal" },
  { pattern: /(?:bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/, name: "Arbitrary hex class" },
];

let hasError = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        for (const { pattern, name } of forbiddenPatterns) {
          if (pattern.test(line)) {
            console.error(
              `\x1b[31m[lint:tokens Error]\x1b[0m ${path.relative(rootDir, fullPath)}:${index + 1}: ${name} found: "${line.trim()}"`
            );
            hasError = true;
          }
        }
      });
    }
  }
}

console.warn("Checking design token enforcement in component & app files...");
targetDirs.forEach(scanDir);

if (hasError) {
  console.error("\x1b[31mToken linting failed! Remove raw hex/rgba literals from components.\x1b[0m");
  process.exit(1);
} else {
  console.warn("\x1b[32m✔ No forbidden color literals found in components.\x1b[0m");
}
