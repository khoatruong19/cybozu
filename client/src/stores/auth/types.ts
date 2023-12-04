import { BaseResponse } from "../../schema/response";
import { User } from "../../schema/types";

export type LoginResponse = BaseResponse & {
  data: {
    user: User;
    accessToken: string;
  };
};

export type GetMeResponse = BaseResponse & {
  data: {
    user: User;
  };
};

export type LogoutResponse = BaseResponse & {
  data: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};
