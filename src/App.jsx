import { useState } from 'react'

import Navbar from './components/Navbar'
import Signup from './pages/signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#222222] min-h-screen" >
    <Navbar/>

    <Signup></Signup>
    </div>
  );
}

export default App
