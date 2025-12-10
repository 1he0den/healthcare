import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Assessments from './pages/Assessments';
import AiAssistant from './pages/AiAssistant';
import FirstAid from './pages/FirstAid';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="ai-chat" element={<AiAssistant />} />
          <Route path="first-aid" element={<FirstAid />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
