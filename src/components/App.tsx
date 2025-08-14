import { I18nProvider } from '../hooks/useI18n';
import MainLayout from './Layout/MainLayout';

export default function App() {
  return (
    <I18nProvider defaultLanguage="fr">
      <MainLayout />
    </I18nProvider>
  );
}