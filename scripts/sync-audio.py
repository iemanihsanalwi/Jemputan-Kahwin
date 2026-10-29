#!/usr/bin/env python3
"""
Sync Wedding Audio Script (yt-dlp)
Downloads a YouTube audio track, converts it to MP3 at public/audio/wedding-bgm.mp3,
and updates wedding.config.json audio source path automatically.
"""

import os
import sys
import json
import subprocess
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT_DIR, "public", "audio")
CONFIG_PATHS = [
    os.path.join(ROOT_DIR, "src", "config", "wedding.config.json"),
    os.path.join(ROOT_DIR, "config", "wedding.config.json"),
]

def main():
    print("=" * 60)
    print("  WALIMATULURUS - YT-DLP AUDIO SYNCHRONIZER")
    print("=" * 60)

    # 1. Get YouTube URL from argument or interactive input
    if len(sys.argv) > 1:
        youtube_url = sys.argv[1].strip()
    else:
        try:
            youtube_url = input("\nMasukkan URL lagu YouTube (cth: https://youtu.be/...): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nDibatalkan.")
            sys.exit(0)

    if not youtube_url:
        print("[RALAT] URL YouTube diperlukan.")
        sys.exit(1)

    # 2. Check yt-dlp availability
    yt_dlp_cmd = shutil.which("yt-dlp")
    use_python_module = False

    if not yt_dlp_cmd:
        try:
            subprocess.run([sys.executable, "-m", "yt_dlp", "--version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            use_python_module = True
        except Exception:
            print("[AMARAN] Program 'yt-dlp' tidak dijumpai dalam PATH.")
            print("Sila pasang yt-dlp: pip install yt-dlp ATAU winget install yt-dlp")
            print("Memperbaharui konfigurasi dengan URL terus sebagai fallback...")

    # Ensure output directory exists
    os.makedirs(AUDIO_DIR, exist_ok=True)
    output_template = os.path.join(AUDIO_DIR, "wedding-bgm.%(ext)s")

    download_success = False
    track_title = None

    if yt_dlp_cmd or use_python_module:
        base_cmd = [sys.executable, "-m", "yt_dlp"] if use_python_module else [yt_dlp_cmd]
        
        # Try fetching video title
        try:
            title_res = subprocess.run(base_cmd + ["--get-title", "--no-playlist", youtube_url], capture_output=True, text=True, check=True)
            track_title = title_res.stdout.strip().split("\n")[0]
            print(f"[INFO] Tajuk Lagu: {track_title}")
        except Exception:
            pass

        print(f"\n[INFO] Sedang memuat turun audio daripada: {youtube_url}")
        exec_cmd = base_cmd + [
            "-x",
            "--audio-format", "mp3",
            "--audio-quality", "0",
            "-o", output_template,
            "--no-playlist",
            youtube_url,
        ]

        try:
            subprocess.run(exec_cmd, check=True)
            print("[BERJAYA] Fail audio berjaya dimuat turun ke: public/audio/wedding-bgm.mp3")
            download_success = True
        except subprocess.CalledProcessError as e:
            print(f"[RALAT] Gagal memuat turun dengan yt-dlp: {e}")
        except FileNotFoundError:
            print("[RALAT] Program yt-dlp tidak dapat dimulakan.")

    # 3. Update wedding.config.json (both src and source)
    target_src = "/audio/wedding-bgm.mp3" if download_success else youtube_url

    for config_path in CONFIG_PATHS:
        if os.path.exists(config_path):
            try:
                with open(config_path, "r", encoding="utf-8") as f:
                    config_data = json.load(f)

                if "audio" not in config_data:
                    config_data["audio"] = {}

                config_data["audio"]["source"] = target_src
                config_data["audio"]["src"] = target_src
                config_data["audio"]["enabled"] = True
                if track_title:
                    config_data["audio"]["title"] = track_title

                with open(config_path, "w", encoding="utf-8") as f:
                    json.dump(config_data, f, indent=2, ensure_ascii=False)

                print(f"[KEMASKINI] Konfigurasi dikemaskini: {os.path.relpath(config_path, ROOT_DIR)}")
                print(f"             audio.source -> \"{target_src}\"")
                print(f"             audio.src    -> \"{target_src}\"")
            except Exception as err:
                print(f"[RALAT] Gagal mengemas kini {config_path}: {err}")

    print("\n[SELESAI] Lagu latar sedia dimainkan pada jemputan perkahwinan!")

if __name__ == "__main__":
    main()
