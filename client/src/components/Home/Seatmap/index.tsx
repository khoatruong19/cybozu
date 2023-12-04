import { useEffect, useMemo, useState } from "react";
import OfficeTitle from "./OfficeTitle";
import Room from "./Room";
import Seat from "./Seat";
import { getRow } from "./constants";
import { cn } from "../../../lib/clsx";
import { MODALS, useModalContext } from "../../../providers/ModalProvider";

const Seatmap = () => {
  const [done, setDone] = useState(false);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[][]>([]);
  const [seats, setSeats] = useState<string[]>([]);
  const [lastOverCell, setLastOverCell] = useState<string | null>(null);

  const { showModal, closeModal } = useModalContext();

  // const __renderRows = (row: string) => {
  //   const rows = getRow(row);
  //   return (
  //     <div className="w-full flex items-center gap-1">
  //       {rows.map((seat, index) => {
  //         return (
  //           <div key={index} className="flex items-center gap-1">
  //             {new Array(seat.order - index).fill(0).map((_, idx) => (
  //               <div key={idx} className="h-12 w-12" />
  //             ))}
  //             <Seat key={seat.id + seat.order + seat.row} seat={seat} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  useEffect(() => {
    const selectingCells = (e: any) => {
      if (e.shiftKey) {
        const cellId = e.target.id;

        if (!!!cellId.length) return;

        const lastCell = selectedCells[selectedCells.length - 1];
        if (lastCell) {
          const lastCellIdx = Number(lastCell.split("seat")[1]);
          const newCellIdx = Number(cellId.split("seat")[1]);
          if (Math.abs(newCellIdx - lastCellIdx) == 14) return;
        }

        const tempCells = [...selectedCells];

        const existingCellIndex = selectedCells.findIndex(
          (item) => item === cellId
        );

        if (existingCellIndex >= 0) return;

        tempCells.push(cellId);
        setSelectedCells(tempCells);
      }
    };

    const doneSelectingCells = (event: any) => {
      if (event.keyCode === 16 && selectedCells.length > 0) {
        setDone(true);
      }
    };

    window.addEventListener("mouseover", selectingCells);
    window.addEventListener("keyup", doneSelectingCells);

    return () => {
      window.removeEventListener("mouseover", selectingCells);
      window.removeEventListener("keyup", doneSelectingCells);
    };
  }, [selectedCells, done]);

  useEffect(() => {
    if (done) {
      showModal(MODALS.CONFIRM, {
        text: "Are you sure you want to create the block here?",
        confirmHandler: () => {
          setBlocks((prev) => [...prev, selectedCells]);
          setSelectedCells([]);
          closeModal();
        },
        cancelHandler: () => {
          setSelectedCells([]);
        },
      });
      setDone(false);
    }
  }, [done]);

  const renderSeats = (idx: number) => (
    <div
      id={"seat" + idx}
      key={Math.random() * 1}
      className={cn(
        "relative h-12 w-12 border border-secondary z-20 rounded-md",
        {
          "border-2 border-red-400":
            !done && selectedCells.includes("seat" + idx),
          "bg-red-400": seats.includes("seat" + idx),
        }
      )}
      onClick={() =>
        !selectedCells.length && setSeats((prev) => [...prev, "seat" + idx])
      }
    ></div>
  );

  const handleOpenBlockModal = () => showModal(MODALS.CONFIRM, {});

  const renderBlocks = (block: string[], idx: number) => {
    const seatIndex = block.findIndex((item) => item === "seat" + idx);

    if (seatIndex < 0) return null;

    const seatNumber = Number(block[seatIndex].split("seat")[1]);

    const foundNextToBlock = block.find(
      (item) => Number(item.split("seat")[1]) - seatNumber == 1
    );
    if (foundNextToBlock) {
      const foundBlock = block.find(
        (item) => Number(item.split("seat")[1]) - seatNumber == 15
      );
      return (
        <div
          onClick={handleOpenBlockModal}
          key={Math.random() * 1}
          className="relative h-12 w-12  z-40"
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-[125%] h-[100%] bg-primary",
              {
                "h-[125%]": foundBlock,
              }
            )}
          ></div>
        </div>
      );
    }

    const foundBlock = block.find(
      (item) => Number(item.split("seat")[1]) - seatNumber == 15
    );
    if (foundBlock)
      return (
        <div
          onClick={handleOpenBlockModal}
          key={Math.random() * 1}
          className="relative h-12 w-12 z-40"
        >
          <div className="absolute top-0 left-0 w-[100%] h-[125%] bg-primary"></div>
        </div>
      );
    else
      return (
        <div
          onClick={handleOpenBlockModal}
          key={Math.random() * 1}
          className="relative h-12 w-12 z-40"
        >
          <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-primary">
            <span
              id="asdasds"
              className={cn(
                "absolute bottom-5 right-0 w-[100px] h-full text-black font-semibold text-xs text-center pt-3 break-all",
                ""
              )}
            >
              Server room
            </span>
          </div>
        </div>
      );
  };

  const blocksArray: string[] = useMemo(
    () => ([] as string[]).concat(...blocks),
    [blocks]
  );

  console.log({ done });

  return (
    <div className="z-1 max-w-7xl w-full mx-auto lg:px-32 py-10 rounded-2xl ">
      <OfficeTitle title="Office 101" />

      <div className="relative max-w-4xl w-full mx-auto flex flex-col gap-4 items-start scale-50 lg:scale-[0.8] 2xl:scale-100">
        {/* {__renderRows("A")}
        <Room className="left-[262px] h-28 w-24" />
        {__renderRows("B")}
        {__renderRows("C")} */}
        <div className="relative flex items-center gap-3 flex-wrap">
          {new Array(100).fill(0).map((_, idx) => (
            <>
              {blocksArray.includes("seat" + idx) ? (
                <>{blocks.map((block) => renderBlocks(block, idx))}</>
              ) : (
                <>{renderSeats(idx)}</>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seatmap;
