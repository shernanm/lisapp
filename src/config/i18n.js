import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const requireAll = (requireContext) => requireContext.keys().map(requireContext);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    fallbackLng: 'es',
    detection: {
      order: ['navigator']
    },
    // React already mitigates XSS attacks so we set escaleValue to false
    interpolation: {
      escapeValue: false
    }
  });

requireAll(require.context('..', true, /i18n\.(js|ts)$/));
