import { I18nProvider } from '../hooks/useI18n';
import { DarkModeProvider } from '../hooks/useDarkMode';
import MainLayout from './layouts/MainLayout';

export default function App() {
  return (
    <I18nProvider defaultLanguage="fr">
      <DarkModeProvider>
        <MainLayout />
      </DarkModeProvider>
    </I18nProvider>
  );
}
