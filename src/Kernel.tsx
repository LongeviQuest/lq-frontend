import { Route, Routes } from 'react-router-dom';
import { MapPage } from './pages/Map/MapPage';
import PageNotFoundPage from './pages/PageNotFound/PageNotFound';
import { LivingPage } from './pages/LivingPage/LivingPage';
import { WomenPage } from './pages/WomenPage/WomenPage';
import { WorldPage } from './pages/WorldPage/WorldPage';
import { MenPage } from './pages/MenPage/MenPage';
import { RecentDeathPage } from './pages/RecentDeathPage/RecentDeathPage';
import { RecentValidPage } from './pages/RecentValidationsPage/RecentValidPage';
import { EmigrantPage } from './pages/EmigrantPage/EmigrantPage';
import { AllByContinentPage } from './pages/AllByContinentPage/AllByContinentPage';
import { AllByDatePage } from './pages/AllByDatePage/AllByDatePage';
import { AllByCountryPage } from './pages/AllByCountryPage/AllByCountryPage';
import { AllByPrefecturePage } from './pages/AllByPrefecturePage/AllByPrefecturePage';
import { EmbedLayout } from './layouts/EmbedLayout/EmbedLayout';
import { ToolLayout } from './layouts/ToolLayout/ToolLayout';
import { useEffect } from 'react';
import { OldestLivingPeopleEmbedPage } from './embeds/TopLivingEmbedPage/OldestLivingPeopleEmbedPage';
import { OldestLivingMenEmbedPage } from './embeds/TopLivingEmbedPage/OldestLivingMenEmbedPage';
import { OldestPeopleEverEmbedPage } from './embeds/TopLivingEmbedPage/OldestPeopleEverEmbedPage';
import { PortalCountryPage } from './pages/PortalCountryPage/PortalCountryPage';
import { AllCountryPage } from './pages/AllByCountryPage/AllCountryPage';

export const Kernel = () => {
  useEffect(() => {
    addGoogleAnalyticsCode();
    if (['/', '/atlas'].includes(window.location.pathname)) {
      window.location.pathname = '/atlas/';
    }
    (window as any).googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <Routes>
      <Route path="/embed/" element={<EmbedLayout />}>
        <Route path="oldest-living" element={<OldestLivingPeopleEmbedPage />} />
        <Route
          path="oldest-people-ever"
          element={<OldestPeopleEverEmbedPage />}
        />
        <Route
          path="oldest-living-men"
          element={<OldestLivingMenEmbedPage />}
        />
      </Route>
      <Route path="/" element={<ToolLayout />}>
        <Route index element={<MapPage />} />
        <Route path="atlas">
          <Route index element={<MapPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="men" element={<MenPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="deaths" element={<RecentDeathPage />} />
          <Route path="validations" element={<RecentValidPage />} />
          <Route path="living" element={<LivingPage />} />
          <Route path="emigrant" element={<EmigrantPage />} />
          <Route path="portal/:country" element={<PortalCountryPage />} />
          <Route path="continent/:continen" element={<AllByContinentPage />} />
          <Route path="country/:country" element={<AllByCountryPage />} />
          <Route path="country/:country/all" element={<AllCountryPage />} />
          <Route
            path="country/:country/:prefecture"
            element={<AllByPrefecturePage />}
          />
          <Route path="date" element={<AllByDatePage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
};
const addGoogleAnalyticsCode = () => {
  const value = '$ced->ecosystem->google-analytics->trackingCode';
  const script = document.getElementById('ga-script');
  script?.innerText.replace(
    '$ced->ecosystem->google-analytics->trackingCode',
    value
  );
};
const googleTranslateElementInit = () => {
  new (window as any).google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'ar,zh-CN,en,fr,de,ja,pt,es',
      autoDisplay: false,
    },
    'google_translate_element'
  );
};
