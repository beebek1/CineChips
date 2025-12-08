import { useState } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#222222] min-h-screen" >
    <Navbar/>

    <Home/>
    
    </div>
  );
}

export default App
