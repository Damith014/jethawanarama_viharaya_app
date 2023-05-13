import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import lk from './lk.json';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'lk',
  fallbackLng: 'lk',
  resources: {
    en: en,
    lk: lk,
  },
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
