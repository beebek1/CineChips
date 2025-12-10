import React from 'react'
import StrangerImg from '../assets/stranger.jpg'
import EasyButton from '../components/BtnCompo'

const Home = () => {
  return (
    <div className="relative w-full h-[500px] ">
      <img 
        src={StrangerImg} 
        alt="theme" 
        className='w-full h-full object-cover'
      />
    {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      {/* Bottom fade overlay */}
      <div  iv className="absolute bottom-0 left-0 w-full h-150 bg-gradient-to-t from-black/100 via-transparent to-transparent pointer-events-none"></div>
      {/* Centered text */}
      <div className='absolute inset-0 flex flex-col items-start justify-end pb-10 pl-8'>
        <h1 className='text-white text-4xl font-bold' style={{ fontFamily: 'Saira' }}>
          Stranger Things
        </h1>

        {/* info about movie */}
        <p className='text-white text-sm mt-2 w-150 font-thin' style={{ fontFamily: 'Saira' }}>
          Ah, you want the text to sit a bit lower on the image instead of being centered. You can do this by adjusting the flex alignment or using bottom positioning. Here’s a clean way in your cod...
        </p>

        {/* buttons */}
        <br />
        <div className='flex'>
          <EasyButton  label={"BOOK NOW"}/>
          <EasyButton variant='' label={"SEE MORE"} className='bg-[#222222] text-white '/>
        </div>
      </div>

          <h1
            className="text-6xl font-bold text-transparent bg-clip-text bg-red-fade"
            style={{ WebkitTextStroke: "1px red" }}
          >
            TOP 10
          </h1>
    </div>
  )
}

export default Home