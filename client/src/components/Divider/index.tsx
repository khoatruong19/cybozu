import { cn } from "../../lib/clsx";

type Props = {
  className?: string;
};

const Divider = ({ className = "" }: Props) => {
  return <div className={cn("h-0.5 bg-black w-full mb-0.5", className)} />;
};

export default Divider;
