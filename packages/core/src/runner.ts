import { discover } from "./discovery.js";
import { runChecks } from "./checks.js";

export async function audit(domain: string) {
  console.log(`Auditing ${domain}...`);
  const anchor = await discover(domain);
  const results = await runChecks(anchor);
  return { anchor, results };
}
