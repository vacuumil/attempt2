import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Navigation } from './pages/Navigation';
import { UnderDevelopment } from './pages/UnderDevelopment';
import Meteorology from './pages/Meteorology';
import ErrorBoundary from './components/ErrorBoundary';
import { About } from './pages/About';
import { Docs } from './pages/Docs/Docs';
import { Support } from './pages/Support/Support';
import { BugReport } from './pages/BugReport/BugReport';
import { Feedback } from './pages/Feedback/Feedback';
import { Terms } from './pages/Terms/Terms';
import { Privacy } from './pages/Privacy/Privacy';

// В компоненте Routes добавьте:
<Route path="/about" element={<About />} />

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppLayout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/navigation" element={<Navigation />} />
              <Route path="/meteorology" element={<Meteorology />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/support" element={<Support />} />
              <Route path="/bug-report" element={<BugReport />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<UnderDevelopment moduleName="Страница не найдена" progress={0} />} />
            </Routes>
          </ErrorBoundary>
        </AppLayout>
      </Router>
    </>
  );
}

export default App;