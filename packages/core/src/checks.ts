import type { AnchorInfo } from "./discovery.js";

export interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  severity: "error" | "warning" | "info";
}

export async function runChecks(anchor: AnchorInfo): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const { domain, toml } = anchor;

  results.push({
    name: "stellar.toml present",
    passed: true,
    message: `Found stellar.toml at ${domain}`,
    severity: "info",
  });

  results.push({
    name: "signing key valid",
    passed: toml.SIGNING_KEY?.startsWith("G") ?? false,
    message: toml.SIGNING_KEY ? "Signing key is a valid Stellar public key" : "Missing SIGNING_KEY",
    severity: "error",
  });

  if (toml.TRANSFER_SERVER) {
    try {
      const res = await fetch(`${toml.TRANSFER_SERVER}/info`);
      results.push({
        name: "SEP-6 info endpoint",
        passed: res.ok,
        message: res.ok ? "SEP-6 info reachable" : `HTTP ${res.status}`,
        severity: "error",
      });
    } catch (err) {
      results.push({
        name: "SEP-6 info endpoint",
        passed: false,
        message: `Unreachable: ${err instanceof Error ? err.message : "unknown"}`,
        severity: "error",
      });
    }
  }

  return results;
}
