import React from "react";
import { renderRow } from "../../components/Home/Seatmap/constants";

const ELEMENT_WIDTH = 50;
const ELEMENT_SPACING = 30;

const Seat = ({
  row,
  order,
  unit,
}: {
  row: string;
  order: number;
  unit: number;
}) => (
  <div
    draggable
    className={`h-8 bg-yellow-100 flex items-center justify-center`}
    style={{
      width: ELEMENT_WIDTH * unit,
      marginLeft: ELEMENT_SPACING,
    }}
  >
    {row + `${order}`}
  </div>
);

const Food = ({
  unit,
  order,
  index,
}: {
  unit: number;
  order: number;
  index: number;
}) => (
  <div
    className={`relative h-12 bg-red-300`}
    style={{
      width: ELEMENT_WIDTH * unit,
      marginLeft:
        index === order
          ? ELEMENT_SPACING
          : ELEMENT_SPACING + ELEMENT_WIDTH * (order - index) + ELEMENT_SPACING,
    }}
  >
    <img
      className="absolute top-0 left-0 w-full h-full object-contain"
      src="https://cdn-icons-png.flaticon.com/512/4843/4843494.png"
      alt=""
    />
  </div>
);

const Map = () => {
  return (
    <div className="flex flex-col gap-5  bg-black w-screen">
      <div className="flex items-center max-w-2xl w-full mx-auto">
        {renderRow("A").map((component, idx) => {
          if (component.type === "seat")
            return (
              <Seat
                order={component.order}
                row={component.row}
                unit={component.unit}
              />
            );
          return (
            <Food unit={component.unit} order={component.order} index={idx} />
          );
        })}
      </div>
      <div className="flex items-center mt-5">
        {renderRow("B").map((component, idx) => {
          if (component.type === "seat")
            return (
              <Seat
                order={component.order}
                row={component.row}
                unit={component.unit}
              />
            );
          return (
            <Food unit={component.unit} order={component.order} index={idx} />
          );
        })}
      </div>
      <div className="flex items-center mt-5">
        {renderRow("C").map((component, idx) => {
          if (component.type === "seat")
            return (
              <Seat
                order={component.order}
                row={component.row}
                unit={component.unit}
              />
            );
          return (
            <Food unit={component.unit} order={component.order} index={idx} />
          );
        })}
      </div>
    </div>
  );
};

export default Map;
