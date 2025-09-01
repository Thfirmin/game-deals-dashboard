import './App.css'
import HomePage from './pages/Home'
import Layout from './Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import AboutPage from './pages/About'
import TestPage from './pages/Test'
import RouterWatch from './components/RouterWatch'

function App() {
  function handleRouteChange(path: string) {
    const appMainElement = document.getElementById('app-main');
    if (appMainElement) {
      appMainElement.classList.forEach(
        (cls) => {
          appMainElement.classList.remove(cls);
        }
      );
      const sanitizedPath = path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-+|-+$/g, '');
      appMainElement.classList.add(`page-${sanitizedPath}`);
    }
    console.log('Route changed to:', path);
  }

  return (
    <BrowserRouter>
      <Layout>
        <RouterWatch onChange={handleRouteChange} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="test" element={<TestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
