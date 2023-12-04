import React, { forwardRef } from "react";
import { cn } from "../../../lib/clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef((props: Props, ref: any) => {
  const { className } = props;
  return (
    <input
      ref={ref}
      {...props}
      className={cn("px-2 py-1 outline-none flex-1", className)}
    />
  );
});

export default Input;
