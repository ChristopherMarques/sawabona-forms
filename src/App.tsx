import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Docs = lazy(() => import('./pages/Docs'));
const Demo = lazy(() => import('./pages/Demo'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
  </div>
);

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
