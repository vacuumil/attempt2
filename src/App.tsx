import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Navigation } from './pages/Navigation';
import { UnderDevelopment } from './pages/UnderDevelopment';
import Meteorology from './pages/Meteorology';
import ErrorBoundary from './components/ErrorBoundary';

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
              <Route path="*" element={<UnderDevelopment moduleName="Страница не найдена" progress={0} />} />
            </Routes>
          </ErrorBoundary>
        </AppLayout>
      </Router>
    </>
  );
}

export default App;