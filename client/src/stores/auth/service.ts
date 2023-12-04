import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { deleteCredentials, setCredentials } from "./slice";
import cookieManagement from "../../lib/js-cookie";
import { BASE_URL, ENDPOINTS } from "../../config/api";
import {
  GetMeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from "./types";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + ENDPOINTS.AUTH,
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
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            const {
              data: { data: credentials },
            } = data;
            dispatch(setCredentials(credentials));
            cookieManagement.setAccessToken(credentials.accessToken);
          })
          .catch(() => {});
      },
    }),
    me: builder.mutation<GetMeResponse, null>({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        queryFulfilled
          .then((data) => {
            const {
              data: {
                data: { user },
              },
            } = data;
            const accessToken =
              (getState() as RootState).auth.accessToken ??
              cookieManagement.getAccessToken();
            if (accessToken) {
              dispatch(setCredentials({ user, accessToken }));
            }
          })
          .catch(() => {});
      },
    }),
    logout: builder.mutation<LogoutResponse, null>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(() => {
            dispatch(deleteCredentials());
            cookieManagement.deleteAccessToken();
          })
          .catch(() => {});
      },
    }),
  }),
});

export const { useLoginMutation, useMeMutation, useLogoutMutation } = authApi;
