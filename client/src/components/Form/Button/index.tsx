import { cn } from "../../../lib/clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const Button = (props: Props) => {
  const { className = "", children } = props;

  return (
    <button
      {...props}
      className={cn(
        "text-lg px-10 py-3 font-semibold hover-opacity",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
