import { useState } from "react";
import { MdEventSeat } from "react-icons/md";

function SeatData({onSeatSelect}) {
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

  const [seats, setSeats] = useState(initialSeatLayout);

  const handleSeatClick = (rowIndex, sectionIndex, seatIndex) => {
    setSeats(prev =>
      prev.map((row, rI) =>
        rI !== rowIndex
          ? row
          : { 
              ...row,
              sections: row.sections.map((section, sI) =>
                sI !== sectionIndex
                  ? section
                  : section.map((seat, seI) => {
                      if (seI !== seatIndex) return seat;
                      if (seat.status === "booked") return seat;

                      const newStatus = seat.status === "available" ? "selected" : "available";

                      if(onSeatSelect && newStatus === "selected"){
                        onSeatSelect({
                          id: seat.id,
                          row: row.row,
                          section : sI,
                          seatIndex: seI,
                          status: newStatus,
                          price: 0
                        });
                      }
                      return {
                        ...seat,
                        status: newStatus
                      };
                    })
              )
            }
      )
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      {seats.map((row, rowIndex) => {
        // Flatten the seats in the row to get total seats count
        const flatSeats = row.sections.flat();
        const totalSeats = flatSeats.length;

        // Parabolic function parameters for arch height
        const archHeight = 90; // max translateY in px (height of the arch)

        return (
          <div
            key={row.row}
            className="flex items-center gap-40"
            style={{}}
          >
            {row.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex gap-9">
                {section.map((seat, seatIndex) => {
                  // Calculate normalized x position between 0 and 1
                  const globalSeatIndex = row.sections
                    .slice(0, sectionIndex)
                    .reduce((acc, sec) => acc + sec.length, 0) + seatIndex;
                  const x = globalSeatIndex / (totalSeats - 1); // normalized position from 0 to 1

                  // Parabolic translateY to create convex arch: y = 4h * (x - 0.5)^2 - h
                  // This makes the middle seat at lowest point (translateY=0), edges at highest (translateY=archHeight)
                  const translateY = -archHeight * 4 * (x - 0.5) * (x - 0.5) + archHeight;

                  // Calculate rotation angles for 3D effect: tilt toward center using rotateZ, slight X for depth
                  // Max Z rotation (inward lean) at edges, 0 at center
                  const maxZRotation = 30; // degrees, more visible 3D
                  const centeredX = 2 * x - 1; // [-1,1]
                  const rotationZ = -centeredX * maxZRotation; // edges lean in, center is 0
                  // Slight X rotation for depth, max at center
                  const maxXRotation = 8; // degrees
                  const rotationX = (1 - Math.abs(centeredX)) * maxXRotation; // max at center, 0 at edges

                  return (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(rowIndex, sectionIndex, seatIndex)}
                      className={`
                        ${seat.status === "available" && "text-white cursor-pointer"}
                        ${seat.status === "selected" && "text-yellow-400 cursor-pointer"}
                        ${seat.status === "booked" && "text-gray-500 cursor-not-allowed"}`}
                      style={{
                        transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg) rotateX(${rotationX}deg)`
                      }}
                    >
                      <MdEventSeat size={39}/>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default SeatData;