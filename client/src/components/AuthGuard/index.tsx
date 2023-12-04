import { useEffect } from "react";
import { useMeMutation } from "../../stores/auth/service";
import { Outlet, useNavigate } from "react-router";
import { APP_ROUTES } from "../../config/routes";
import cookieManagement from "../../lib/js-cookie";

const AuthGuard = () => {
  const [me, { isLoading }] = useMeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetMe = async () => {
      const accessToken = cookieManagement.getAccessToken();
      if (!accessToken) return navigate(APP_ROUTES.LOGIN);

      me(null)
        .then(() => navigate(APP_ROUTES.HOME))
        .catch(() => {
          navigate(APP_ROUTES.LOGIN);
        });
    };
    handleGetMe();
  }, []);

  if (isLoading) return "Loading...";

  return <Outlet />;
};

export default AuthGuard;
