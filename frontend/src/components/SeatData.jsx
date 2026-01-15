import { useState } from "react";
import { MdEventSeat } from "react-icons/md";

const initialSeatLayout = [
  {
    row: "A",
    sections: [
      [{ id: "A1", status: "available" }, { id: "A2", status: "available" }, { id: "A3", status: "booked" }],
      [{ id: "A4", status: "available" }, { id: "A5", status: "available" }, { id: "A6", status: "available" }, { id: "A7", status: "available" }, { id: "A8", status: "available" }, { id: "A9", status: "available" }],
      [{ id: "A10", status: "available" }, { id: "A11", status: "available" }, { id: "A12", status: "available" }]
    ]
  },
  {
    row: "B",
    sections: [
      [{ id: "B1", status: "available" }, { id: "B2", status: "available" }, { id: "B3", status: "available" }],
      [{ id: "B4", status: "available" }, { id: "B5", status: "booked" }, { id: "B6", status: "available" }, { id: "B7", status: "available" }, { id: "B8", status: "available" }, { id: "B9", status: "available" }],
      [{ id: "B10", status: "available" }, { id: "B11", status: "available" }, { id: "B12", status: "available" }]
    ]
  },
  {
    row: "C",
    sections: [
      [{ id: "C1", status: "available" }, { id: "C2", status: "available" }, { id: "C3", status: "available" }],
      [{ id: "C4", status: "available" }, { id: "C5", status: "available" }, { id: "C6", status: "available" }, { id: "C7", status: "available" }, { id: "C8", status: "available" }, { id: "C9", status: "available" }],
      [{ id: "C10", status: "available" }, { id: "C11", status: "available" }, { id: "C12", status: "available" }]
    ]
  },
  {
    row: "D",
    sections: [
      [{ id: "D1", status: "available" }, { id: "D2", status: "available" }, { id: "D3", status: "available" }],
      [{ id: "D4", status: "available" }, { id: "D5", status: "available" }, { id: "D6", status: "available" }, { id: "D7", status: "available" }, { id: "D8", status: "available" }, { id: "D9", status: "available" }],
      [{ id: "D10", status: "available" }, { id: "D11", status: "available" }, { id: "D12", status: "available" }]
    ]
  },
  {
    row: "E",
    sections: [
      [{ id: "E1", status: "available" }, { id: "E2", status: "available" }, { id: "E3", status: "available" }],
      [{ id: "E4", status: "available" }, { id: "E5", status: "available" }, { id: "E6", status: "available" }, { id: "E7", status: "available" }, { id: "E8", status: "available" }, { id: "E9", status: "available" }],
      [{ id: "E10", status: "available" }, { id: "E11", status: "available" }, { id: "E12", status: "available" }]
    ]
  },
  {
    row: "F",
    sections: [
      [{ id: "F1", status: "available" }, { id: "F2", status: "available" }, { id: "F3", status: "available" }],
      [{ id: "F4", status: "available" }, { id: "F5", status: "available" }, { id: "F6", status: "available" }, { id: "F7", status: "available" }, { id: "F8", status: "available" }, { id: "F9", status: "available" }],
      [{ id: "F10", status: "available" }, { id: "F11", status: "available" }, { id: "F12", status: "available" }]
    ]
  }
];

function SeatData({ onSeatSelect }) {
  const [seats, setSeats] = useState(initialSeatLayout);

  const handleSeatClick = (rowIndex, sectionIndex, seatIndex) => {
    // FIX: Declare the variable so it doesn't cause a crash
    let seatUpdate = null;

    setSeats(prev =>
      prev.map((row, rI) => {
        if (rI !== rowIndex) return row;
        return {
          ...row,
          sections: row.sections.map((section, sI) =>
            sI !== sectionIndex
              ? section
              : section.map((seat, seI) => {
                  if (seI !== seatIndex || seat.status === "booked") return seat;

                  const newStatus = seat.status === "available" ? "selected" : "available";

                  // FIX: Properly assign the seat data here
                  seatUpdate = { id: seat.id, status: newStatus };

                  return { ...seat, status: newStatus };
                })
          )
        };
      })
    );

    // FIX: Notify Parent AFTER the logic is done to avoid the "update during render" error
    if (onSeatSelect && seatUpdate) {
      onSeatSelect(seatUpdate);
    }
  };

  return (
    <div className="flex flex-col gap-14 items-center mt-10">
      <div className="flex flex-col gap-10 items-center">
        {seats.map((row, rowIndex) => {
          const flatSeats = row.sections.flat();
          const totalSeats = flatSeats.length;
          const archHeight = 80;

          return (
            <div key={row.row} className="flex items-center gap-16">
              <span className="text-gray-600 text-xs font-bold w-4">{row.row}</span>
              {row.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex gap-4">
                  {section.map((seat, seatIndex) => {
                    const globalSeatIndex = row.sections
                      .slice(0, sectionIndex)
                      .reduce((acc, sec) => acc + sec.length, 0) + seatIndex;
                    const x = globalSeatIndex / (totalSeats - 1);
                    const translateY = -archHeight * 4 * (x - 0.5) * (x - 0.5) + archHeight;
                    const rotationZ = -(2 * x - 1) * 25;
                    const rotationX = (1 - Math.abs(2 * x - 1)) * 10;

                    return (
                      <div
                        key={seat.id}
                        onClick={() => handleSeatClick(rowIndex, sectionIndex, seatIndex)}
                        className={`transition-all duration-300 transform
                          ${seat.status === "available" && "text-white cursor-pointer hover:text-yellow-200 hover:scale-110"}
                          ${seat.status === "selected" && "text-yellow-400 cursor-pointer scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"}
                          ${seat.status === "booked" && "text-gray-700 cursor-not-allowed"}`}
                        style={{
                          transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg) rotateX(${rotationX}deg)`
                        }}
                      >
                        <MdEventSeat size={32} />
                      </div>
                    );
                  })}
                </div>
              ))}
              <span className="text-gray-600 text-xs font-bold w-4">{row.row}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-10 mt-20 border-t border-gray-700 pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MdEventSeat className="text-white" size={24} /> Available
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MdEventSeat className="text-yellow-400" size={24} /> Selected
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MdEventSeat className="text-gray-600" size={24} /> Booked
        </div>
      </div>
    </div>
  );
}

export default SeatData;