import { useEffect } from "react";
import { useMeMutation } from "../stores/auth/service";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../config/routes";

export const useCheckAuth = () => {
  const [me, { isError }] = useMeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetMe = async () => {
      await me(null);
    };
    handleGetMe();
  }, []);

  useEffect(() => {
    if (isError) navigate(APP_ROUTES.LOGIN);
  }, [isError]);
};
