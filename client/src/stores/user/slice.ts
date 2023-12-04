import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "../../schema/types";

type UserState = {
  users: User[];
};

const USER_SLICE_NAME = "user";

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState: { users: [] } as UserState,
  reducers: {
    setUsers: (
      state,
      { payload: { users } }: PayloadAction<{ users: User[] }>
    ) => {
      state.users = users;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.users;
