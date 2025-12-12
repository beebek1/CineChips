const ImageWithText = ({ imageSrc, backgroundText, showText=false, size="sm", border = ""}) => {

  const sizes = {
    sm: "w-50 h-74",
    md: "w-40 h-56",
    lg: "w-56 h-80",
  };


  const ImgBorders = {
    border : "border-t-6 border-l-5 border-[#2a313d] "
  };




  return (
    <div className={`relative flex-shrink-0 overflow-visible`}>
      
      {/* Text half above the image */}
      {showText && (<h1 
          className="absolute top-47 -left-12 text-transparent text-9xl font-bold opacity-90 z-0"
          style={{fontFamily:'MuseoModerno',
                  WebkitTextStroke: '3px #ffd602'
          }}
        >
          {backgroundText}
        </h1>
      )}

      {/* Image */}
        <img
          src={imageSrc}
          alt={backgroundText}
          className={`relative z-1 object-cover rounded-md  ${sizes[size]} ${ImgBorders[border]} `}
        />
    </div>
  );
};

export default ImageWithText;