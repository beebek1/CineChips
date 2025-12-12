import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
      <Router>
        <div className="bg-[#222222] min-h-screen">

        {/* Navbar stays OUTSIDE routes */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
      
  );
}

export default App
