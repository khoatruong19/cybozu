import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import cookieManagement from "../../lib/js-cookie";
import { BASE_URL, ENDPOINTS } from "../../config/api";
import { setUser } from "../auth/slice";
import {
  UpdateProfileResponse,
  UpdateProfileRequest,
  UploadRequest,
  UploadResponse,
  GetAllResponse,
  CreateUserResponse,
  CreateUserRequest,
  UpdateUserResponse,
  UpdateUserRequest,
  DeleteUserResponse,
  DeleteUserRequest,
} from "./types";
import { setUsers } from "./slice";

export const userApi = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + ENDPOINTS.USER,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.accessToken ??
        cookieManagement.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    upload: builder.mutation<UploadResponse, UploadRequest>({
      query: ({ userId, formData }) => ({
        url: `/${userId}/upload`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
      onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        queryFulfilled
          .then((data) => {
            const {
              data: { data: url },
            } = data;
            dispatch(
              setUser({
                user: { ...(getState() as RootState).auth.user!, avatar: url },
              })
            );
          })
          .catch(() => {});
      },
    }),
    getAllUsers: builder.query<GetAllResponse, void>({
      query: () => ({ url: "" }),
      providesTags: ["Users"],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            const {
              data: { data: users },
            } = data;
            dispatch(setUsers({ users }));
          })
          .catch(() => {});
      },
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (data) => ({
        url: ``,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then(() => {}).catch(() => {});
      },
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then(() => {}).catch(() => {});
      },
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: ({ userId, full_name }) => ({
        url: `/profile/${userId}`,
        method: "PATCH",
        body: { full_name },
      }),
      invalidatesTags: ["Users"],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            const {
              data: { data: user },
            } = data;
            dispatch(setUser({ user }));
          })
          .catch(() => {});
      },
    }),
    deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then(() => {}).catch(() => {});
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useUploadMutation,
} = userApi;
