import { BaseResponse } from "../../schema/response";
import { User } from "../../schema/types";

export type UploadRequest = {
  formData: FormData;
  userId: number;
};

export type UploadResponse = BaseResponse & {
  data: string;
};

export type GetAllResponse = BaseResponse & {
  data: User[];
};

export type CreateUserRequest = FormData;

export type CreateUserResponse = BaseResponse & {
  data: {
    id: number;
  };
};

export type UpdateUserRequest = {
  id: number;
  data: FormData;
};

export type UpdateUserResponse = BaseResponse & {
  data: {
    user: User;
  };
};

export type UpdateProfileRequest = {
  full_name: string;
  userId: number;
};

export type UpdateProfileResponse = BaseResponse & {
  data: User;
};

export type DeleteUserRequest = {
  userId: number;
};

export type DeleteUserResponse = BaseResponse;
