import { cn } from "../../../../../lib/clsx";

type Props = {
  className?: string;
};

const RoomCell = ({ className = "" }: Props) => {
  return (
    <div key={Math.random() * 1} className="relative h-12 w-12  z-50">
      <div
        className={cn(
          "absolute top-0 left-0 w-[124%] h-[100%] bg-secondary",
          className
        )}
      ></div>
    </div>
  );
};

export default RoomCell;
