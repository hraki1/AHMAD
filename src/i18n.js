import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // لتحميل ملفات الترجمة من مجلد public/locales
  .use(LanguageDetector) // لاكتشاف لغة المستخدم تلقائياً
  .use(initReactI18next) // لربط i18next مع React
  .init({
    fallbackLng: "en", // اللغة الافتراضية لو مافي ترجمة
    debug: true, // لتظهر معلومات في الكونسول (تقدر تطفيه لاحقاً)
    interpolation: {
      escapeValue: false, // React تحمي النصوص تلقائياً من XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // مسار ملفات الترجمة
    },
    react: {
      useSuspense: true, // مهم لتحميل الترجمة بشكل سليم
    },
  });

export default i18n;
