/**
 * Seed Wedding Configuration Script
 * Reads local src/config/wedding.config.json and uploads it into Supabase `wedding_config` (id = 1).
 */
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

function loadEnvVars() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf8");
  const vars = {};
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const k = trimmed.substring(0, idx).trim();
      let v = trimmed.substring(idx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      vars[k] = v;
    }
  });
  return vars;
}

async function seed() {
  const vars = loadEnvVars();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || vars.NEXT_PUBLIC_SUPABASE_URL || vars.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || vars.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || vars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing Supabase URL or Key in environment / .env.local");
    process.exit(1);
  }

  const configPath = path.join(__dirname, "..", "config", "wedding.config.json");
  if (!fs.existsSync(configPath)) {
    console.error("Could not find configuration at:", configPath);
    process.exit(1);
  }

  const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
  console.log(`Read local wedding config for: ${configData.couple?.groom?.shortName} & ${configData.couple?.bride?.shortName}`);

  const supabase = createClient(url, key);

  console.log(`Uploading configuration to Supabase at ${url} (table: wedding_config, id: 1)...`);
  const { data, error } = await supabase
    .from("wedding_config")
    .upsert({
      id: 1,
      config: configData,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error("Failed to seed configuration:", error.message);
    if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
      console.log("\nNote: Please create the 'wedding_config' table first in the Supabase SQL Editor using 'supabase/migrations/20261029_wedding_config.sql'.");
    }
    process.exit(1);
  }

  console.log("Successfully seeded wedding configuration into Supabase!");
  console.log("Record:", data);
}

seed();
