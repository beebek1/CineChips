import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div className="bg-[#222222] min-h-screen" >
      <Router>
        <Navbar/>
        <Home/>
      </Router>
    </div>
  );
}

export default App
