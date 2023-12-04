import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../config/api";

const cookieManagement = () => {
  const setAccessToken = (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: 1,
    });
  };

  const getAccessToken = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    return accessToken;
  };

  const deleteAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
  };

  return { setAccessToken, getAccessToken, deleteAccessToken };
};

export default cookieManagement();
