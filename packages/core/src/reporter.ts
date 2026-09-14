import type { CheckResult } from "./checks.js";

export function reportText(results: CheckResult[]): string {
  const lines = [];
  const passed = results.filter((r) => r.passed).length;
  lines.push(`Results: ${passed}/${results.length} passed`);
  for (const r of results) {
    const icon = r.passed ? "✓" : r.severity === "error" ? "✗" : "⚠";
    lines.push(`${icon} ${r.name}: ${r.message}`);
  }
  return lines.join("\n");
}
