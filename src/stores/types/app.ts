import { LanguageType, AppLanguage } from '@/types';

export type AppState = {
  isInternet: boolean;
  isDebugging: boolean;
  appLanguage: AppLanguage;
};
