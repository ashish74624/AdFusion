
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Publishers from './pages/Publisher';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='publisher' element={<Publishers/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
