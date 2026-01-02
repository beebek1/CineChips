import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/signup'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SignIn from './pages/Signin';

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/signup' || location.pathname ==='/signin';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <div className="bg-[#222222] min-h-screen">
        <AppWrapper />
      </div>
    </Router>
  );
}

export default App;