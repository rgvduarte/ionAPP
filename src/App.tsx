import { useEffect } from 'react';
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { TabBar } from './components/TabBar';
import { ToastProvider } from './components/Toast';
import { I18nProvider, useI18n } from './lib/i18n';
import { StoreProvider, useStore } from './lib/store';
import Agenda from './screens/Agenda';
import Credential from './screens/Credential';
import Home from './screens/Home';
import More, { EditProfile, Info, NewsDetail, NewsList, Partners } from './screens/More';
import Networking, { AttendeeDetail } from './screens/Networking';
import SessionDetail from './screens/SessionDetail';
import { SpeakerDetail, SpeakerList } from './screens/Speakers';
import Welcome from './screens/Welcome';

function Shell() {
  const { state } = useStore();
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  if (!state.profile) return <Navigate to="/welcome" replace />;
  return (
    <div className="app">
      <Outlet />
      <TabBar />
    </div>
  );
}

function LangAttr() {
  const { lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <LangAttr />
      <StoreProvider>
        <ToastProvider>
          {/* Hash routing works unchanged on GitHub Pages and inside Capacitor. */}
          <HashRouter>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route element={<Shell />}>
                <Route index element={<Home />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="agenda/:id" element={<SessionDetail />} />
                <Route path="speakers" element={<SpeakerList />} />
                <Route path="speakers/:id" element={<SpeakerDetail />} />
                <Route path="credential" element={<Credential />} />
                <Route path="networking" element={<Networking />} />
                <Route path="networking/:id" element={<AttendeeDetail />} />
                <Route path="more" element={<More />} />
                <Route path="more/profile" element={<EditProfile />} />
                <Route path="partners" element={<Partners />} />
                <Route path="info" element={<Info />} />
                <Route path="news" element={<NewsList />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </ToastProvider>
      </StoreProvider>
    </I18nProvider>
  );
}
