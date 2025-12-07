import { useState } from 'react'

import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#191919] min-h-screen">
    <Navbar/>
    </div>
  );
}

export default App
