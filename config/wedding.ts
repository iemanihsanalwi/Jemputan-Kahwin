import { WeddingConfig } from "@/types/wedding";
import rawConfig from "@/src/config/wedding.config.json";

/**
 * WEDDING APPLICATION CONFIGURATION
 *
 * Diimport secara langsung dari `src/config/wedding.config.json` (atau `config/wedding.config.json`).
 * Perubahan maklumat perkahwinan kini boleh diubah melalui JSON atau Antaramuka Admin /admin.
 */
export const weddingConfig: WeddingConfig = {
  ...rawConfig,
  // Ensure backward compatibility with `music` field if referenced
  music: {
    enabled: rawConfig.audio.enabled,
    title: rawConfig.audio.title,
    artist: rawConfig.audio.artist,
    src: rawConfig.audio.src,
    autoPlayPrompt: rawConfig.audio.autoPlayPrompt,
    autoLoop: rawConfig.audio.autoLoop,
  },
  admin: {
    pin: process.env.ADMIN_PIN || rawConfig.admin.pin || "037172",
  },
  seo: {
    ...rawConfig.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL || rawConfig.seo.url,
  },
} as WeddingConfig;

export default weddingConfig;
