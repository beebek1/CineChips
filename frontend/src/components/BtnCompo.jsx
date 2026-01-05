const BtnCompo = ({ label, onClick, variant = "default", className = "" }) => {

    const base =
    "rounded-xs text-sm flex items-center justify-center transition-all px-4 ";


  const variants = {
    default: "bg-[#ffd602] text-black h-10  mr-5",
    noutline: "flex items-center space-x-2 text-[#ffd602] p-2 hover:text-[#e6c500] px-4 ",
    
  };

  return (
    <button 
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      style={{fontFamily:'Saira'}}
    >
      {label}
    </button>
  );
};

export default BtnCompo