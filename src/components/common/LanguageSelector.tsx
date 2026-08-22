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

export function LanguageSelector({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetLanguage = event.target.value;
    if (targetLanguage === "en") {
      window.location.href = `${window.location.origin}${window.location.pathname}${window.location.search}`;
      return;
    }

    const translateUrl = `https://translate.google.com/translate?sl=en&tl=${encodeURIComponent(targetLanguage)}&u=${encodeURIComponent(window.location.href)}`;
    window.location.href = translateUrl;
  };

  return (
    <div className={`group relative inline-flex items-center ${inverse ? "text-white/72" : "text-muted-foreground"}`}>
      <Globe2 className="pointer-events-none absolute left-2.5 h-3.5 w-3.5" aria-hidden="true" />
      <label htmlFor={compact ? "montvelle-language-mobile" : "montvelle-language"} className="sr-only">Choose language</label>
      <select
        id={compact ? "montvelle-language-mobile" : "montvelle-language"}
        defaultValue="en"
        onChange={handleChange}
        aria-label="Translate Montvelle"
        className={`appearance-none rounded-full border bg-transparent py-2 pl-8 pr-7 text-[10px] font-medium tracking-[0.03em] outline-none transition-colors ${
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
