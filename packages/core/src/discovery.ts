import { z } from "zod";

export const stellarTomlSchema = z.object({
  TRANSFER_SERVER: z.string().url().optional(),
  TRANSFER_SERVER_SEP0024: z.string().url().optional(),
  KYC_SERVER: z.string().url().optional(),
  QUOTE_SERVER: z.string().url().optional(),
  DIRECT_PAYMENT_SERVER: z.string().url().optional(),
  ANCHOR_QUOTE_SERVER: z.string().url().optional(),
  DOCUMENTATION: z.string().url().optional(),
  SIGNING_KEY: z.string().regex(/^G[A-Z2-7]{55}$/),
  HORIZON_URL: z.string().url().optional(),
  WEB_AUTH_ENDPOINT: z.string().url().optional(),
  CURRENCIES: z.array(z.object({ code: z.string(), issuer: z.string().optional() })).optional(),
});

export type StellarToml = z.infer<typeof stellarTomlSchema>;

export interface AnchorInfo {
  domain: string;
  toml: StellarToml;
  fetchedAt: string;
}

export async function discover(domain: string): Promise<AnchorInfo> {
  const url = `https://${domain}/.well-known/stellar.toml`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const text = await res.text();
  const toml = parseToml(text);
  const parsed = stellarTomlSchema.parse(toml);
  return { domain, toml: parsed, fetchedAt: new Date().toISOString() };
}

function parseToml(text: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) result[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
  }
  return result;
}
