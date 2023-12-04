import LoginForm from "../../components/Login/LoginForm";
import useDisableBackButton from "../../hooks/useDisableBackButton";

const Login = () => {
  useDisableBackButton();

  return (
    <div className="w-screen h-screen bg-login-background bg-center bg-cover flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;
