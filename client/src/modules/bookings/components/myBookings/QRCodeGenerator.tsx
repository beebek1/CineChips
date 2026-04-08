import React from "react";

type Props = {
  data: string;
};

const QRCodeGenerator: React.FC<Props> = ({ data }) => {
  const encodedData = encodeURIComponent(data);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="p-2 bg-white rounded-xl shadow-inner group">
      <img
        src={qrUrl}
        alt="Ticket QR Code"
        className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-lg transition-transform group-hover:scale-105"
      />
    </div>
  );
};

export default QRCodeGenerator;