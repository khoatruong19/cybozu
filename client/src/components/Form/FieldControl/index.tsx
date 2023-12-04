import { FieldErrors } from "react-hook-form";
import { cn } from "../../../lib/clsx";
import Input from "../Input";
import Label from "../Label";

type Props = {
  containerClass?: string;
  labelClass?: string;
  inputWrapperClass?: string;
  inputClass?: string;
  inputDisabled?: boolean;
  inputValue?: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  register?: Function;
  name: string;
  field: string;
  errors?: FieldErrors;
};

const FieldControl = (props: Props) => {
  const {
    containerClass = "",
    labelClass = "",
    inputWrapperClass = "",
    inputClass = "",
    inputDisabled = false,
    inputValue,
    placeholder = "",
    type = "text",
    icon: Icon,
    iconPosition = "left",
    register = () => {},
    name,
    field,
    errors,
  } = props;

  return (
    <div className={cn("flex flex-col gap-1 w-full", containerClass)}>
      <Label field={field} className={labelClass} />
      <div
        className={cn(
          "flex items-center gap-2 rounded-md overflow-hidden py-1",
          inputWrapperClass
        )}
      >
        {Icon && iconPosition === "left" && Icon}
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={cn("flex-1 bg-transparent", inputClass)}
          disabled={inputDisabled}
          value={inputValue}
        />
        {Icon && iconPosition === "right" && Icon}
      </div>
      {errors && errors[name] && (
        <span className="text-xs text-red-400 font-semibold">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FieldControl;
