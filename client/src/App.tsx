
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Publishers from './pages/Publisher';
import PublisherView from './pages/PublisherView';
import { ModalProvider } from './components/ui/animated-modal';
import AdvertiserList from './pages/AdvertiserList';
import AdvertiserView from './pages/AdvertiserView';
import CampaignManager from './pages/CampaignView';
import ZoneView from './pages/ZoneView';

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='publisher' element={<Publishers />} />
            <Route path='publisher/view' element={<PublisherView />} />
            <Route path='publisher/zone/view' element={<ZoneView />} />
            <Route path='advertiser' element={<AdvertiserList />} />
            <Route path='advertiser/view' element={<AdvertiserView />} />
            <Route path='advertiser/campaign/view' element={<CampaignManager />} />
          </Route>
        </Routes>
      </Router>
    </ModalProvider>
  );
};

export default App;
