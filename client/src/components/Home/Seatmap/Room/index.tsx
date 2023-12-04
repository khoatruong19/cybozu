import { cn } from "../../../../lib/clsx";

type Props = {
  title?: string;
  className?: string;
};

const Room = ({ title = "Room", className = "" }: Props) => {
  return (
    <div
      className={cn(
        "absolute top-0 bg-tertiary flex items-center justify-center rounded-md z-1 text-white",
        className
      )}
    >
      {title}
    </div>
  );
};

export default Room;
