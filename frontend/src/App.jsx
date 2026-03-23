import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Kids from './pages/Kids';
import Visual from './pages/Visual';
import Student from './pages/Student';
import Exam from './pages/Exam';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/visual" element={<Visual />} />
            <Route path="/student" element={<Student />} />
            <Route path="/exam" element={<Exam />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2026 Adaptive Learning Interface. Designing for Everyone.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
