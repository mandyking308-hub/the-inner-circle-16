import { useId, type ChangeEvent } from "react";
import { Globe2 } from "lucide-react";

const languages = [
  ["en", "English"], ["zh-CN", "中文（简体）"], ["zh-TW", "中文（繁體）"], ["es", "Español"], ["hi", "हिन्दी"], ["ar", "العربية"], ["bn", "বাংলা"], ["pt", "Português"], ["ru", "Русский"], ["ja", "日本語"], ["pa", "ਪੰਜਾਬੀ"], ["de", "Deutsch"], ["fr", "Français"], ["sw", "Kiswahili"], ["uk", "Українська"], ["pl", "Polski"], ["tr", "Türkçe"], ["it", "Italiano"], ["nl", "Nederlands"], ["ko", "한국어"], ["th", "ไทย"], ["vi", "Tiếng Việt"], ["ms", "Bahasa Melayu"], ["id", "Bahasa Indonesia"], ["tl", "Filipino"], ["ur", "اردو"], ["fa", "فارسی"], ["he", "עברית"], ["am", "አማርኛ"], ["ha", "Hausa"], ["yo", "Yorùbá"], ["ig", "Igbo"], ["zu", "isiZulu"], ["af", "Afrikaans"], ["sq", "Shqip"], ["eu", "Euskera"], ["be", "Беларуская"], ["bg", "Български"], ["ca", "Català"], ["hr", "Hrvatski"], ["cs", "Čeština"], ["da", "Dansk"], ["et", "Eesti"], ["fi", "Suomi"], ["gl", "Galego"], ["el", "Ελληνικά"], ["hu", "Magyar"], ["is", "Íslenska"], ["ga", "Gaeilge"], ["lv", "Latviešu"], ["lt", "Lietuvių"], ["mk", "Македонски"], ["mt", "Malti"], ["no", "Norsk"], ["ro", "Română"], ["sr", "Српски"], ["sk", "Slovenčina"], ["sl", "Slovenščina"], ["sv", "Svenska"], ["cy", "Cymraeg"],
] as const;

export function LanguageSelector({ inverse = false }: { inverse?: boolean; compact?: boolean }) {
  const selectId = useId();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <label htmlFor={selectId} className="sr-only">Choose language</label>
      <select id={selectId} defaultValue="en" onChange={handleChange} aria-label="Translate Montvelle" className={`appearance-none rounded-full border bg-transparent py-2 pl-8 pr-7 text-[10px] font-medium tracking-[0.03em] outline-none transition-colors ${inverse ? "border-white/18 text-white/78 hover:border-white/32 focus:border-white/48" : "border-foreground/12 text-foreground/68 hover:border-foreground/25 focus:border-foreground/35"}`}>
        {languages.map(([code, label]) => <option key={code} value={code} className="bg-[#f6f1e8] text-[#171716]">{label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2.5 text-[8px] opacity-55" aria-hidden="true">▾</span>
    </div>
  );
}

export const translationNotice = "Translations are provided for convenience. The English-language Montvelle documents are authoritative.";
