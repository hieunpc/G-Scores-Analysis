import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckScore, Report, TopStudents, Dashboard } from './pages';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check-score" element={<CheckScore />} />
          <Route path="/report" element={<Report />} />
          <Route path="/top-students" element={<TopStudents />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
