import { SeatType } from "../../../../schema/types";

type Props = {
  seat: SeatType;
};

const Seat = ({ seat }: Props) => {
  const { order, row } = seat;

  return (
    <div className="w-12 h-12 rounded-md bg-secondary text-white flex items-center justify-center font-semibold shadow-md">
      {row + `${order}`}
    </div>
  );
};

export default Seat;
