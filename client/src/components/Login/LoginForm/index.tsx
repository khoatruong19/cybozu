import { Lock, User } from "lucide-react";
import Button from "../../Form/Button";
import { useLoginMutation } from "../../../stores/auth/service";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../../../schema/form";
import { useNavigate } from "react-router";
import { cn } from "../../../lib/clsx";
import { APP_ROUTES } from "../../../config/routes";
import FieldControl from "../../Form/FieldControl";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginSchemaType> = (value: LoginSchemaType) => {
    login(value)
      .unwrap()
      .then(() => {
        navigate(APP_ROUTES.HOME);
      })
      .catch(() => {});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full bg-transparent border-2 border-white backdrop-blur-[20px] shadow-lg text-white rounded-xl py-8 px-10"
    >
      <h1 className="text-4xl font-semibold text-center mb-8">Login</h1>

      <FieldControl
        field="Email"
        type="email"
        errors={errors}
        name="email"
        placeholder="Email..."
        register={register}
        icon={<User strokeWidth={2.5} />}
        iconPosition="right"
        inputWrapperClass={cn("px-4 h-12 border-2 border-white rounded-3xl", {
          "border-danger ": errors.email,
        })}
        inputClass="bg-transparent placeholder:text-white font-semibold text-[16px]"
      />

      <FieldControl
        field="Password"
        type="password"
        errors={errors}
        name="password"
        placeholder="Password..."
        register={register}
        icon={<Lock strokeWidth={2.5} />}
        iconPosition="right"
        inputWrapperClass={cn("px-4 h-12 border-2 border-white rounded-3xl", {
          "border-danger ": errors.password,
        })}
        inputClass="bg-transparent placeholder:text-white font-semibold text-[16px]"
      />

      <Button
        disabled={isLoading}
        type="submit"
        className="w-full h-12 bg-white text-black rounded-3xl my-6 text-lg font-bold hover-opacity"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
