import { useEffect, useId, useState, type ChangeEvent } from "react";
import { Globe2 } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "zh-TW", label: "中文（繁體）" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "hi", label: "हिन्दी" },
  { code: "tr", label: "Türkçe" },
  { code: "ru", label: "Русский" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "pl", label: "Polski" },
  { code: "el", label: "Ελληνικά" },
  { code: "he", label: "עברית" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "ur", label: "اردو" },
  { code: "bn", label: "বাংলা" },
  { code: "sw", label: "Kiswahili" },
] as const;

const WIDGET_ID = "google_translate_element";
const SCRIPT_ID = "google-translate-script";

function readCurrentLanguage(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const parts = decodeURIComponent(match[1] ?? "").split("/");
  return parts[2] || "en";
}

function writeCookie(value: string | null) {
  const host = window.location.hostname;
  // Clearing requires expiring on every scope the cookie may have been set on.
  const domains = ["", `; domain=${host}`, `; domain=.${host}`];
  for (const domain of domains) {
    if (value === null) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    } else {
      document.cookie = `googtrans=${value}; path=/${domain}`;
    }
  }
}

export function LanguageSelector({ inverse = false }: { inverse?: boolean; compact?: boolean }) {
  const selectId = useId();
  const [value, setValue] = useState("en");

  useEffect(() => {
    setValue(readCurrentLanguage());

    if (document.getElementById(SCRIPT_ID)) return;

    if (!document.getElementById(WIDGET_ID)) {
      const host = document.createElement("div");
      host.id = WIDGET_ID;
      host.style.display = "none";
      document.body.appendChild(host);
    }

    (window as unknown as Record<string, unknown>)["googleTranslateElementInit"] = () => {
      const g = (window as unknown as { google?: { translate?: { TranslateElement?: new (o: unknown, el: string) => void } } }).google;
      if (g?.translate?.TranslateElement) {
        new g.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, WIDGET_ID);
      }
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target.value;
    setValue(target);
    if (target === "en") {
      writeCookie(null);
    } else {
      writeCookie(`/en/${target}`);
    }
    window.location.reload();
  };

  return (
    <div className={`group relative inline-flex items-center ${inverse ? "text-white/72" : "text-muted-foreground"}`}>
      <Globe2 className="pointer-events-none absolute left-2.5 h-3.5 w-3.5" aria-hidden="true" />
      <label htmlFor={selectId} className="sr-only">Choose language</label>
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        aria-label="Translate Montvelle"
        className={`notranslate appearance-none rounded-full border bg-transparent py-2 pl-8 pr-7 text-[10px] font-medium tracking-[0.03em] outline-none transition-colors ${
          inverse
            ? "border-white/18 text-white/78 hover:border-white/32 focus:border-white/48"
            : "border-foreground/12 text-foreground/68 hover:border-foreground/25 focus:border-foreground/35"
        }`}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} className="bg-[#f6f1e8] text-[#171716]">
            {language.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 text-[8px] opacity-55" aria-hidden="true">▾</span>
    </div>
  );
}

export const translationNotice = "Translations are provided for convenience. The English-language version is authoritative.";
