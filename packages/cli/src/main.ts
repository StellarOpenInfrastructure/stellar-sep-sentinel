#!/usr/bin/env node
import { Command } from "commander";
import { audit } from "@stellar-sep-sentinel/core";
import { reportText } from "@stellar-sep-sentinel/core";

const program = new Command()
  .name("stellar-sentinel")
  .description("Stellar SEP and anchor conformance testing")
  .version("0.1.0");

program
  .command("audit <domain>")
  .description("Audit an anchor's SEP compliance")
  .action(async (domain: string) => {
    try {
      const { results } = await audit(domain);
      console.log(reportText(results));
      process.exit(results.every((r) => r.passed) ? 0 : 1);
    } catch (err) {
      console.error("Error:", err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

program.parse();
