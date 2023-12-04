import { cn } from "../../../lib/clsx";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  field: string;
};

const Label = ({ field, htmlFor = "", className = "" }: Props) => {
  return (
    <label htmlFor={htmlFor} className={cn("text-lg font-semibold", className)}>
      {field}
    </label>
  );
};

export default Label;
