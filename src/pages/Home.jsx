import React from 'react'
import StrangerImg from '../assets/stranger.jpg'
import EasyButton from '../components/BtnCompo'
import ImageWithText from '../components/TextImg';
import Logo from '../assets/cinechipsLogoBlack.svg';
import Underline from '../assets/underline.svg'


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
      <div  iv className="absolute bottom-0 left-0 w-full h-150 bg-gradient-to-t from-[#222222]/100 via-transparent to-transparent pointer-events-none"></div>
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

      <br /><br />

      <div className='flex items-center pl-10'>
        <h1
          className="text-9xl font-bold text-transparent bg-clip-text bg-red-fade"
          style={{ 
            WebkitTextStroke: "2px #92813b",
            letterSpacing: "-3px", 
            fontFamily:'Saira'
          }}
        >
          NOW
        </h1>

        <div className='ml-8 font-semibold text-white' style={{fontFamily:'Saira', letterSpacing: "5px"}}>
          <h3> SHOWING </h3>
          <h3> OUT THERE </h3>
        </div>
      </div>


      <div className="flex space-x-15 py-4 px-24 my-17 scrollbar-hide overflow-x-auto overflow-y-hidden justify-start">
        <ImageWithText imageSrc={StrangerImg} backgroundText="1" showText={true}/>
        <ImageWithText imageSrc={StrangerImg} backgroundText="2" showText={true}/>
        <ImageWithText imageSrc={StrangerImg} backgroundText="3" showText={true}/>
        <ImageWithText imageSrc={StrangerImg} backgroundText="4" showText={true}/>
        <ImageWithText imageSrc={StrangerImg} backgroundText="5" showText={true}/>
      </div>


      <div className='flex items-center'>
        <div className="w-3 h-10 rounded-xl  bg-[#ffd602] ml-9.5"></div>
          <h1 
            className='ml-4 font-bold text-white text-xl' 
            style={{fontFamily:'Saira', letterSpacing: "4px"}}> 
            UPCOMING 
          </h1>
      </div>

      <div className=" flex space-x-6 py-4 px-10 my-5 scrollbar-hide overflow-x-auto overflow-y-hidden justify-start">
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>
        <ImageWithText imageSrc={StrangerImg} size='lg' border='border'/>

      </div>

      <div className='relative bg-[#ffd602] h-60 my-20'>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 text-[#303030] text-9xl font-bold" style={{fontFamily:'MuseoModerno'}}>CINECHIPS</h1>

        <div className='absolute top-69 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#303030] h-65 w-300'>
          <div className='flex space-x-3 ml-30 mt-15'>
            <h1 
              className='-ml-20 font-semibold text-[#ffd602] text-3xl' 
              style={{fontFamily:'Saira', letterSpacing: "1px"}}> 
              NEW MOVIES EVERY SUNDAY ON
            </h1>

              <h1 
                className=' font-semibold text-[#ffd602] text-3xl z-1' 
                style={{fontFamily:'MuseoModerno', letterSpacing: "1px"}}> 
                CINECHIPS
              </h1>

          </div>

          <div className='relative ml-50 my-5 text-white ' style={{fontFamily:"saira"}}>
            <p>HOME</p>
            <p>BOOKING</p>
            <p>STAY IN TOUCH</p>

          </div>

          <div className="absolute top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#303030]">
            <p className="text-[#ffd602] text-xs leading-tight">
              This site does not store any files on our server, we only linked to the media which is hosted on 3rd party.
            </p>
          </div>
        </div>


      </div>

    </div>     

  )
}

export default Home