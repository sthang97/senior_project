import { Route, Routes } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import About from './components/About';
import Camera from './components/Camera';
import Navbar from './components/Navbar';
import Message from './components/Message';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
       <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/data" element={<Data/>} />
          <Route path="/camera" element={<Camera/>} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
