import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Safe public default URL for this wedding project
const FALLBACK_SUPABASE_URL = "https://ehifbwrgwhecbelttjyl.supabase.co";

/**
 * Universal environment variable resolver
 * Works across:
 * 1. Cloudflare Pages Edge Runtime (globalThis request context)
 * 2. Next.js App Router (process.env)
 * 3. Fallback value
 */
export function getEnvVar(key: string, fallback = ""): string {
  // 1. Cloudflare Pages Edge request context
  try {
    const cfContext = (globalThis as Record<symbol, unknown>)[
      Symbol.for("__cloudflare-request-context__")
    ] as { env?: Record<string, unknown> } | undefined;
    if (cfContext?.env && cfContext.env[key]) {
      return String(cfContext.env[key]);
    }
  } catch {
    // Outside Cloudflare request context
  }

  // 2. Next.js / Node process.env
  try {
    if (typeof process !== "undefined" && process?.env && process.env[key]) {
      return String(process.env[key]);
    }
  } catch {
    // process not available
  }

  return fallback;
}

export function getSupabaseUrl(): string {
  const url =
    getEnvVar("NEXT_PUBLIC_SUPABASE_URL") ||
    getEnvVar("SUPABASE_URL") ||
    FALLBACK_SUPABASE_URL;

  if (!url || !url.startsWith("http") || url.includes("your-project-id")) {
    console.error(
      "[Supabase] NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Check Cloudflare Pages Environment Variables."
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key =
    getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    getEnvVar("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
    getEnvVar("SUPABASE_PUBLISHABLE_KEY") ||
    getEnvVar("SUPABASE_ANON_KEY");

  if (!key) {
    console.error(
      "[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Please configure it in Cloudflare Pages Variables & Secrets."
    );
  }
  return key;
}

export function getSupabaseServiceRoleKey(): string {
  return (
    getEnvVar("SUPABASE_SERVICE_ROLE_KEY") ||
    getEnvVar("SUPABASE_SECRET_KEY")
  );
}

// Dynamic check for Supabase configuration
export function checkSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  return Boolean(
    url &&
      anonKey &&
      !url.includes("your-project-id") &&
      url.startsWith("http")
  );
}

// Backward-compatible static check
export const isSupabaseConfigured = checkSupabaseConfigured();

// Cache instances per runtime context
let _browserClient: SupabaseClient | null = null;
let _serviceClient: SupabaseClient | null = null;

// Public client (for browser and public queries)
export const getSupabaseClient = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!url || !anonKey) {
    return null;
  }

  if (!_browserClient) {
    _browserClient = createClient(url, anonKey, {
      auth: {
        persistSession: typeof window !== "undefined",
      },
    });
  }
  return _browserClient;
};

// Server-side service role client (bypasses RLS for secure server handlers)
export const getServiceSupabase = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const serviceKey = getSupabaseServiceRoleKey() || getSupabaseAnonKey();

  if (!url || !serviceKey) {
    return getSupabaseClient();
  }

  if (!_serviceClient) {
    _serviceClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return _serviceClient;
};

// Default client instance for existing imports
export const supabase: SupabaseClient | null = getSupabaseClient();
