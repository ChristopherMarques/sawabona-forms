import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Helper to add minimum delay with type safety
function minDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      promise.then(resolve);
    }, ms);
  });
}

// Lazy load pages for better performance with min delay for loading screen
const Landing = lazy(() => minDelay(import('./pages/Landing'), 2000));
const Docs = lazy(() => minDelay(import('./pages/Docs'), 1000));
const Demo = lazy(() => minDelay(import('./pages/Demo'), 1000));

// Loading component
import { Loading } from './components/Loading';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
