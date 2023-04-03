import { Route, Routes } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import About from './components/About';
import Camera from './components/Camera';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
       <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/data" element={<Data/>} />
          <Route path="/camera" element={<Camera/>} />
        </Routes>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
